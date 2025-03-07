"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getAllProductsByTenantId_dao_1 = require("../dao/getAllProductsByTenantId.dao");
const getAllProductsService = async () => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const products = await (0, getAllProductsByTenantId_dao_1.getAllProductsByTenantId)(SERVER_TENANT_ID);
        return {
            data: {
                products
            },
            status: 200
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getAllProductsService = getAllProductsService;
