import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

// Konfigurasi API Endpoint
const AUTH_URL = 'http://localhost:8000/api/auth';
const CART_URL = 'http://localhost:8001/api/cart';
const ORDER_URL = 'http://localhost:8001/api/order';
const PRODUCT_URL = 'http://localhost:8002/api/product';

// Metrics untuk tracking performa
const loginTrend = new Trend('login_duration');
const cartTrend = new Trend('cart_duration');
const orderTrend = new Trend('order_duration');
const productTrend = new Trend('product_duration');

const adminToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwYTEwNmE1LTE1MDMtNDUwOC1iYmY3LWRjY2NlNGI2Nzg0OCIsInRlbmFudF9pZCI6IjQ3ZGQ2YjI0LTBiMjMtNDZiMC1hNjYyLTc3NjE1OGQwODliYSIsImlhdCI6MTc0MTI1ODE0MywiZXhwIjoxNzQxMzQ0NTQzfQ.nKoaPZEn8EoBTM8kMU82UzEAU_y_Yxeug1-vPLsPIwo'
// Fungsi sinusoidal untuk workload
function sinusoidalLoad(t, A, B, C) {
    return Math.floor(A * Math.sin(B * t) + C);
}

export let options = {
    stages: [
        { duration: '1m', target: 10 }, // Normal Load
        { duration: '1m', target: 50 }, // Peak Load
        { duration: '1m', target: 10 }, // Cooldown
    ],
};

// Simpan state untuk user
let userToken = '';
let categoryId = '';
let chartid='';
let orderid='';
let totalamount='';

export default function () {
    let time = __VU + __ITER; // Simulasi waktu dengan kombinasi user dan iterasi
    let users = sinusoidalLoad(time, 50, 0.1, 20);
    
    if (__ITER === 0) {
        registerAndLogin();
    }
    addItemToCart();
    getAllCartItems();
    editCartItem();
    deleteCartItem();  
    addItemToCart(); 
    placeOrder();
    getAllOrders();
    getOrderDetail();
    payOrder();
    getAllProducts();
    getProductById();
    sleep(1);
}

function registerAndLogin() {
    let payload = JSON.stringify({
        username: `user_${__VU}`,
        email: `user_${__VU}@example.com`,
        password: 'Test12345',
        full_name: 'Test User',
        address: 'Test Address',
        phone_number: '1234567890',
    });

    let registerRes = http.post(`${AUTH_URL}/register`, payload, {
        headers: { 'Content-Type': 'application/json' }
    });

    check(registerRes, { 'Register success': (res) => res.status === 201 });

    let loginRes = http.post(`${AUTH_URL}/login`, JSON.stringify({
        username: `user_${__VU}`, // Ganti dari email ke username
        password: 'Test12345',
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
    
    check(loginRes, { 'Login success': (res) => res.status === 200 });
    
    
    userToken = loginRes.json('token') || loginRes.json('access_token') || loginRes.json('data.token');

}





function addItemToCart() {
    let payload = JSON.stringify({
        product_id: 'ce581a29-019c-4b42-8280-0f37befe473b',
        quantity: 3
    });
    let res = http.post(`${CART_URL}/`, payload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` } });
    chartid=res.json('id')
    check(res, { 'Item added to cart': (res) => res.status === 201 });
}

function getAllCartItems() {
    let res = http.get(`${CART_URL}/`, { headers: { 'Authorization': `Bearer ${userToken}` } });
    check(res, { 'Fetched cart items': (res) => res.status === 200 });
}

function editCartItem() {
    let payload = JSON.stringify({
        cart_id: `${chartid}`,
        quantity: 5
    });
    let res = http.put(`${CART_URL}/`, payload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` } });

    check(res, { 'Cart item updated': (res) => res.status === 200 });
}

function deleteCartItem() {
    let payload = JSON.stringify({
        product_id: 'ce581a29-019c-4b42-8280-0f37befe473b'
    });
    let res = http.del(`${CART_URL}/`, payload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` } });
    check(res, { 'Cart item deleted': (res) => res.status === 200 });
}

function placeOrder() {
    let payload = JSON.stringify({
        shipping_provider: "SICEPAT"
    });
    let res = http.post(`${ORDER_URL}/`, payload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` } });
    let responseBody = res.json();  // Ubah body ke JSON object
    orderid = responseBody?.order?.id ?? null;
    totalamount = responseBody?.order?.total_amount ?? null;
    if (res.status !== 201) {
        console.log(`Create XXXXXXXXXXX body: ${res.body}`);
        console.log(`Create XXXXXXXXXXX status: ${res.status}`);
    }
    check(res, { 'Order placed': (res) => res.status === 201 });
}

function getAllOrders() {
    let res = http.get(`${ORDER_URL}/`, { headers: { 'Authorization': `Bearer ${userToken}` } });
    check(res, { 'Fetched all orders': (res) => res.status === 200 });
}

function getOrderDetail() {
    let res = http.get(`${ORDER_URL}/${orderid}`, { headers: { 'Authorization': `Bearer ${userToken}` } });
    check(res, { 'Fetched order detail': (res) => res.status === 200 });
}

function payOrder() {

    let payload = JSON.stringify({
        payment_method: "OCTO",
        payment_reference: "250217GM1234567890",
        amount: totalamount
    });

    let res = http.post(`${ORDER_URL}/${orderid}/pay`, payload, { 
        headers: { 
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        } 
    });

    check(res, { 'Order paid': (res) => res.status === 200 });
}

function getAllProducts() {
    let res = http.get(`${PRODUCT_URL}/`, { headers: { 'Authorization': `Bearer ${userToken}` } });
    check(res, { 'Fetched all products': (res) => res.status === 200 });
}

function getProductById() {
    let res = http.get(`${PRODUCT_URL}/ce581a29-019c-4b42-8280-0f37befe473b`, { headers: { 'Authorization': `Bearer ${userToken}` } });
    check(res, { 'Fetched product by ID': (res) => res.status === 200 });
}
