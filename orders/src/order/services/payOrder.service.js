"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payOrderService = void 0;
const patterns_1 = require("@src/commons/patterns");
const payOrder_dao_1 = require("../dao/payOrder.dao");
const payOrderService = async (orderId, payment_method, payment_reference, amount) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse("Server tenant id not found").generate();
        }
        const paymentData = {
            tenant_id: SERVER_TENANT_ID,
            order_id: orderId,
            payment_method,
            payment_reference,
            amount,
        };
        const payment = await (0, payOrder_dao_1.payOrder)(paymentData);
        return {
            data: payment,
            status: 200,
        };
    }
    catch (err) {
        if (err.message === 'Rollback') {
            return new patterns_1.BadRequestResponse("Payment amount does not match order total amount").generate();
        }
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.payOrderService = payOrderService;
