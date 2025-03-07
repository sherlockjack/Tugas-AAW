"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemToCartService = void 0;
const patterns_1 = require("@src/commons/patterns");
const addItemToCart_dao_1 = require("../dao/addItemToCart.dao");
const addItemToCartService = async (user, product_id, quantity) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Tenant ID not found').generate();
        }
        if (!user.id) {
            return new patterns_1.NotFoundResponse('User not found').generate();
        }
        const cartData = {
            tenant_id: SERVER_TENANT_ID,
            user_id: user.id,
            product_id: product_id,
            quantity: quantity,
        };
        const item = await (0, addItemToCart_dao_1.addItemToCart)(cartData);
        return {
            data: Object.assign({}, item),
            status: 201,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.addItemToCartService = addItemToCartService;
