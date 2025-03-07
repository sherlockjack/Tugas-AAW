"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCartItemsService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getAllCartItems_dao_1 = require("../dao/getAllCartItems.dao");
const getAllCartItemsService = async (user) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Tenant ID not found').generate();
        }
        if (!user.id) {
            return new patterns_1.NotFoundResponse('User not found').generate();
        }
        const items = await (0, getAllCartItems_dao_1.getAllCartItems)(SERVER_TENANT_ID, user.id);
        return {
            data: items,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getAllCartItemsService = getAllCartItemsService;
