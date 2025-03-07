"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByCategoryService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getProductByCategory_dao_1 = require("../dao/getProductByCategory.dao");
const getProductByCategoryService = async (category_id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const products = await (0, getProductByCategory_dao_1.getProductByCategory)(SERVER_TENANT_ID, category_id);
        return {
            data: {
                products,
            },
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getProductByCategoryService = getProductByCategoryService;
