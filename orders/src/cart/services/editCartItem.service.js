"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCartItemService = void 0;
const patterns_1 = require("@src/commons/patterns");
const editCartDataById_dao_1 = require("../dao/editCartDataById.dao");
const deleteCartItem_dao_1 = require("../dao/deleteCartItem.dao");
const editCartItemService = async (user, cart_id, quantity) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Tenant ID not found').generate();
        }
        if (!user.id) {
            return new patterns_1.InternalServerErrorResponse('User ID not found').generate();
        }
        let cart;
        if (quantity !== undefined && quantity < 1) {
            cart = await (0, deleteCartItem_dao_1.deleteCartItem)(SERVER_TENANT_ID, user.id, cart_id);
            cart.quantity = 0;
        }
        else {
            cart = await (0, editCartDataById_dao_1.editCartDataById)(SERVER_TENANT_ID, cart_id, {
                quantity,
            });
        }
        return {
            data: cart,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.editCartItemService = editCartItemService;
