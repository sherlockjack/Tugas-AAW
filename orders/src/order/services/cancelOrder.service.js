"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrderService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getOrderById_dao_1 = require("../dao/getOrderById.dao");
const cancelOrder_dao_1 = require("../dao/cancelOrder.dao");
const cancelOrderService = async (user, order_id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse("Server tenant id not found").generate();
        }
        if (!user.id) {
            return new patterns_1.NotFoundResponse("User id not found").generate();
        }
        const order = await (0, getOrderById_dao_1.getOrderById)(SERVER_TENANT_ID, user.id, order_id);
        if (order.user_id !== user.id) {
            return new patterns_1.UnauthorizedResponse("User not authorized to cancel this order").generate();
        }
        if (['CANCELLED', 'REFUNDED'].includes(order.order_status)) {
            return new patterns_1.UnauthorizedResponse("Order already cancelled").generate();
        }
        await (0, cancelOrder_dao_1.cancelOrder)(SERVER_TENANT_ID, user.id, order_id);
        order.order_status = 'CANCELLED';
        return {
            data: order,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.cancelOrderService = cancelOrderService;
