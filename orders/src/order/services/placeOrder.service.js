"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrderService = void 0;
const getAllCartItems_dao_1 = require("@src/orders/cart/dao/getAllCartItems.dao");
const patterns_1 = require("@src/shared/commons/patterns");
const createOrder_dao_1 = require("../dao/createOrder.dao");
const axios_1 = __importDefault(require("axios"));
const placeOrderService = async (user, shipping_provider) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse("Server tenant id not found").generate();
        }
        if (!['JNE', 'TIKI', 'SICEPAT', 'GOSEND', 'GRAB_EXPRESS'].includes(shipping_provider)) {
            return new patterns_1.NotFoundResponse('Shipping provider not found').generate();
        }
        if (!user.id) {
            return new patterns_1.InternalServerErrorResponse("User id not found").generate();
        }
        // get the cart items
        const cartItems = await (0, getAllCartItems_dao_1.getAllCartItems)(SERVER_TENANT_ID, user.id);
        // get the product datas
        const productIds = cartItems.map((item) => item.product_id);
        if (productIds.length === 0) {
            return new patterns_1.BadRequestResponse('Cart is empty').generate();
        }
        const products = await axios_1.default.post(`${process.env.PRODUCT_MS_URL}/product/many`, { productIds });
        if (products.status !== 200) {
            return new patterns_1.InternalServerErrorResponse("Failed to get products").generate();
        }
        // create order
        const order = await (0, createOrder_dao_1.createOrder)(SERVER_TENANT_ID, user.id, cartItems, products.data, shipping_provider);
        return {
            data: order,
            status: 201,
        };
    }
    catch (err) {
        console.error(err);
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.placeOrderService = placeOrderService;
