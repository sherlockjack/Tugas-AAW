"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = void 0;
const patterns_1 = require("@src/commons/patterns");
const deleteProductById_dao_1 = require("../dao/deleteProductById.dao");
const deleteProductService = async (id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const product = await (0, deleteProductById_dao_1.deleteProductById)(SERVER_TENANT_ID, id);
        return {
            data: Object.assign({}, product),
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.deleteProductService = deleteProductService;
