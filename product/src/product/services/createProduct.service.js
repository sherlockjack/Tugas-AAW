"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductService = void 0;
const patterns_1 = require("@src/commons/patterns");
const createNewProduct_dao_1 = require("../dao/createNewProduct.dao");
const createProductService = async (name, description, price, quantity_available, category_id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server Tenant ID not found').generate();
        }
        const productData = {
            tenant_id: SERVER_TENANT_ID,
            name,
            description,
            price,
            quantity_available,
        };
        if (category_id) {
            productData.category_id = category_id;
        }
        const newProduct = await (0, createNewProduct_dao_1.createNewProduct)(productData);
        return {
            data: newProduct,
            status: 201,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.createProductService = createProductService;
