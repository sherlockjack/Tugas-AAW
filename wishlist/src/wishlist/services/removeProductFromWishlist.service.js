"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductFromWishlistService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getWishlistDetailById_dao_1 = require("../dao/getWishlistDetailById.dao");
const getWishlistById_dao_1 = require("../dao/getWishlistById.dao");
const removeProductFromWishlist_dao_1 = require("../dao/removeProductFromWishlist.dao");
const removeProductFromWishlistService = async (id, user) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server tenant ID is missing').generate();
        }
        if (!user.id) {
            return new patterns_1.InternalServerErrorResponse('User ID is missing').generate();
        }
        const wishlistDetail = await (0, getWishlistDetailById_dao_1.getWishlistDetailById)(id);
        if (!wishlistDetail) {
            return new patterns_1.InternalServerErrorResponse('Wishlist detail not found').generate();
        }
        const wishlist = await (0, getWishlistById_dao_1.getWishlistById)(SERVER_TENANT_ID, wishlistDetail.wishlist_id);
        if (!wishlist) {
            return new patterns_1.InternalServerErrorResponse('Wishlist not found').generate();
        }
        if (wishlist.user_id !== user.id) {
            return new patterns_1.InternalServerErrorResponse('User is not authorized to remove product from this wishlist').generate();
        }
        const removeWishlistDetailData = await (0, removeProductFromWishlist_dao_1.removeProductFromWishlist)(id);
        return {
            data: removeWishlistDetailData,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.removeProductFromWishlistService = removeProductFromWishlistService;
