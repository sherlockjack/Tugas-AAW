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
exports.payOrder = void 0;
const db_1 = require("@src/db");
const schemaPayment = __importStar(require("@db/schema/orders/payment"));
const schemaOrder = __importStar(require("@db/schema/orders/order"));
const schemaOrderDetail = __importStar(require("@db/schema/orders/orderDetail"));
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const payOrder = async (data) => {
    const result = await db_1.db.transaction(async (trx) => {
        const payment = await trx
            .insert(schemaPayment.payment)
            .values(data)
            .returning({
            id: schemaPayment.payment.id,
            order_id: schemaPayment.payment.order_id,
            payment_date: schemaPayment.payment.payment_date,
            payment_method: schemaPayment.payment.payment_method,
            payment_reference: schemaPayment.payment.payment_reference,
            amount: schemaPayment.payment.amount,
        });
        const order = await trx
            .update(schemaOrder.order)
            .set({
            order_status: 'PAID',
            shipping_code: `MOCK-SHIPPING-${(0, uuid_1.v4)()}`,
            shipping_status: 'PENDING',
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemaOrder.order.id, data.order_id), (0, drizzle_orm_1.eq)(schemaOrder.order.tenant_id, data.tenant_id)))
            .returning({
            id: schemaOrder.order.id,
            order_date: schemaOrder.order.order_date,
            total_amount: schemaOrder.order.total_amount,
            order_status: schemaOrder.order.order_status,
            shipping_provider: schemaOrder.order.shipping_provider,
            shipping_code: schemaOrder.order.shipping_code,
            shipping_status: schemaOrder.order.shipping_status,
        });
        const orderDetail = await trx
            .select()
            .from(schemaOrderDetail.orderDetail)
            .where((0, drizzle_orm_1.eq)(schemaOrderDetail.orderDetail.order_id, data.order_id));
        const total_amount = orderDetail.reduce((acc, item) => {
            return acc + (item.unit_price * item.quantity);
        }, 0);
        if ((payment === null || payment === void 0 ? void 0 : payment[0].amount) !== total_amount) {
            await trx.rollback();
            return;
        }
        return {
            payment: payment === null || payment === void 0 ? void 0 : payment[0],
            order: order === null || order === void 0 ? void 0 : order[0],
        };
    });
    return result;
};
exports.payOrder = payOrder;
