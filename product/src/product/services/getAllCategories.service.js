"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoriesService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getAllCategoriesByTenantId_dao_1 = require("../dao/getAllCategoriesByTenantId.dao");
const getAllCategoriesService = async () => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const categories = await (0, getAllCategoriesByTenantId_dao_1.getAllCategoriesByTenantId)(SERVER_TENANT_ID);
        return {
            data: {
                categories
            },
            status: 200
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getAllCategoriesService = getAllCategoriesService;
