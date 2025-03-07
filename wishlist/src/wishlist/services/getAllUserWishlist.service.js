"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserWishlistService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getAllUserWishlist_dao_1 = require("../dao/getAllUserWishlist.dao");
const getAllUserWishlistService = async (user) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server tenant ID is missing').generate();
        }
        if (!user.id) {
            return new patterns_1.NotFoundResponse('User ID is missing').generate();
        }
        const wishlists = await (0, getAllUserWishlist_dao_1.getAllUserWishlist)(SERVER_TENANT_ID, user.id);
        return {
            data: wishlists,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getAllUserWishlistService = getAllUserWishlistService;
