"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItemService = void 0;
const patterns_1 = require("@src/commons/patterns");
const deleteCartItemByProductId_dao_1 = require("../dao/deleteCartItemByProductId.dao");
const deleteCartItemService = async (user, product_id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Tenant ID not found').generate();
        }
        if (!user.id) {
            return new patterns_1.NotFoundResponse('User not found').generate();
        }
        const cart = await (0, deleteCartItemByProductId_dao_1.deleteCartItemByProductId)(SERVER_TENANT_ID, user.id, product_id);
        return {
            data: cart,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.deleteCartItemService = deleteCartItemService;
