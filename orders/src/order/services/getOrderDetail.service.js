"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetailService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getOrderById_dao_1 = require("../dao/getOrderById.dao");
const getOrderDetail_dao_1 = require("../dao/getOrderDetail.dao");
const getOrderDetailService = async (user, order_id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            throw new Error("SERVER_TENANT_ID is not defined");
        }
        if (!user.id) {
            return new patterns_1.InternalServerErrorResponse("User ID is not defined").generate();
        }
        if (!order_id) {
            return new patterns_1.InternalServerErrorResponse("Order ID is not defined").generate();
        }
        const orderDetail = await (0, getOrderDetail_dao_1.getOrderDetail)(SERVER_TENANT_ID, order_id);
        if (!orderDetail) {
            return new patterns_1.NotFoundResponse("Order detail not found").generate();
        }
        const order = await (0, getOrderById_dao_1.getOrderById)(SERVER_TENANT_ID, user.id, orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.order_id);
        if (!order) {
            return new patterns_1.NotFoundResponse("Order not found").generate();
        }
        if (order.user_id !== user.id) {
            return new patterns_1.UnauthorizedResponse("User is not authorized").generate();
        }
        return {
            data: Object.assign({}, orderDetail),
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getOrderDetailService = getOrderDetailService;
