"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProductService = void 0;
const patterns_1 = require("@src/commons/patterns");
const editProductById_dao_1 = require("../dao/editProductById.dao");
const editProductService = async (id, name, description, price, quantity_available, category_id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const product = await (0, editProductById_dao_1.editProductById)(SERVER_TENANT_ID, id, {
            name,
            description,
            price,
            quantity_available,
            category_id,
        });
        return {
            data: product,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.editProductService = editProductService;
