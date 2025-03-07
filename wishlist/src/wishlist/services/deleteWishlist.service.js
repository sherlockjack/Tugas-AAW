"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistService = void 0;
const patterns_1 = require("@src/commons/patterns");
const deleteWishlistById_dao_1 = require("../dao/deleteWishlistById.dao");
const deleteWishlistService = async (id) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server tenant ID is missing').generate();
        }
        const wishlist = await (0, deleteWishlistById_dao_1.deleteWishlistById)(SERVER_TENANT_ID, id);
        if (!wishlist) {
            return new patterns_1.InternalServerErrorResponse('Wishlist not found').generate();
        }
        return {
            data: wishlist,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.deleteWishlistService = deleteWishlistService;
