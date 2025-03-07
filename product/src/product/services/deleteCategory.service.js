"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = void 0;
const patterns_1 = require("@src/commons/patterns");
const deleteCategoryById_dao_1 = require("../dao/deleteCategoryById.dao");
const deleteCategoryService = async (category_id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const category = await (0, deleteCategoryById_dao_1.deleteCategoryById)(SERVER_TENANT_ID, category_id);
        return {
            data: Object.assign({}, category),
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.deleteCategoryService = deleteCategoryService;
