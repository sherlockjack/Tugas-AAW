"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyProductDatasByIdService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getManyProductDatasById_dao_1 = require("../dao/getManyProductDatasById.dao");
const getManyProductDatasByIdService = async (productIds) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const products = await (0, getManyProductDatasById_dao_1.getManyProductDatasById)(SERVER_TENANT_ID, productIds);
        return {
            data: products,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getManyProductDatasByIdService = getManyProductDatasByIdService;
