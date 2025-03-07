"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryService = void 0;
const patterns_1 = require("@src/commons/patterns");
const createNewCategory_dao_1 = require("../dao/createNewCategory.dao");
const createCategoryService = async (name) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const categoryData = {
            tenant_id: SERVER_TENANT_ID,
            name,
        };
        const newCategory = await (0, createNewCategory_dao_1.createNewCategory)(categoryData);
        return {
            data: Object.assign({}, newCategory),
            status: 201,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.createCategoryService = createCategoryService;
