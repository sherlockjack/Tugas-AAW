"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getAllOrders_dao_1 = require("../dao/getAllOrders.dao");
const getAllOrdersService = async (user) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            throw new Error("SERVER_TENANT_ID is not defined");
        }
        if (!user.id) {
            return new patterns_1.InternalServerErrorResponse("User ID is not defined").generate();
        }
        const orders = await (0, getAllOrders_dao_1.getAllOrders)(SERVER_TENANT_ID, user.id);
        return {
            data: orders,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getAllOrdersService = getAllOrdersService;
