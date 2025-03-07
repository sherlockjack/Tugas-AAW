"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const db_1 = require("@src/db");
const schemaCart = __importStar(require("@db/schema/orders/cart"));
const schemaOrder = __importStar(require("@db/schema/orders/order"));
const schemaOrderDetail = __importStar(require("@db/schema/orders/orderDetail"));
const drizzle_orm_1 = require("drizzle-orm");
const createOrder = async (tenant_id, user_id, cart_items, products_data, shipping_provider) => {
    const result = await db_1.db.transaction(async (trx) => {
        // calculate total amount
        const total_amount = cart_items.reduce((acc, item) => {
            const product = products_data.find((product) => product.id === item.product_id);
            if (!product) {
                throw new Error("Product not found");
            }
            return acc + item.quantity * product.price;
        }, 0);
        // create order
        const orderData = {
            tenant_id,
            user_id,
            total_amount,
            shipping_provider,
        };
        const order = await trx
            .insert(schemaOrder.order)
            .values(orderData)
            .returning();
        const orderDict = order[0];
        // create order details
        const orderDetailsData = cart_items.map((item) => {
            const product = products_data.find((product) => product.id === item.product_id);
            if (!product) {
                throw new Error("Product not found");
            }
            return {
                tenant_id,
                order_id: orderDict.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: product.price,
            };
        });
        const orderDetails = await trx
            .insert(schemaOrderDetail.orderDetail)
            .values(orderDetailsData)
            .returning();
        // empty the cart
        await trx
            .delete(schemaCart.cart)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemaCart.cart.tenant_id, tenant_id), (0, drizzle_orm_1.eq)(schemaCart.cart.user_id, user_id)));
        return {
            order: orderDict,
            orderDetails,
        };
    });
    return result;
};
exports.createOrder = createOrder;
