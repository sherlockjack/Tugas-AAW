"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategoryService = void 0;
const patterns_1 = require("@src/commons/patterns");
const editCategoryById_dao_1 = require("../dao/editCategoryById.dao");
const editCategoryService = async (category_id, name) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const category = await (0, editCategoryById_dao_1.editCategoryById)(SERVER_TENANT_ID, category_id, {
            name,
        });
        return {
            data: category,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.editCategoryService = editCategoryService;
