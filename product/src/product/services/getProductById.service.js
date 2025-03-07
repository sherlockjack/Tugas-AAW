"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByIdService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getProductById_dao_1 = require("../dao/getProductById.dao");
const getProductByIdService = async (id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const products = await (0, getProductById_dao_1.getProductById)(SERVER_TENANT_ID, id);
        return {
            data: Object.assign({}, products),
            status: 200
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getProductByIdService = getProductByIdService;
