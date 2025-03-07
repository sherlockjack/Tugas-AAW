"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWishlistService = void 0;
const patterns_1 = require("@src/commons/patterns");
const createWishlist_dao_1 = require("../dao/createWishlist.dao");
const createWishlistService = async (user, name) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server tenant ID is missing').generate();
        }
        if (!user.id) {
            return new patterns_1.InternalServerErrorResponse('User ID is missing').generate();
        }
        const wishlistData = {
            name,
            user_id: user.id,
            tenant_id: SERVER_TENANT_ID,
        };
        const wishlist = await (0, createWishlist_dao_1.createWishlist)(wishlistData);
        return {
            data: wishlist,
            status: 201,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.createWishlistService = createWishlistService;
