"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlistByIdService = void 0;
const patterns_1 = require("@src/commons/patterns");
const getWishlistDetailByWishlistId_dao_1 = require("../dao/getWishlistDetailByWishlistId.dao");
const getWishlistById_dao_1 = require("../dao/getWishlistById.dao");
const getWishlistByIdService = async (wishlist_id, user) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server tenant ID is missing').generate();
        }
        const wishlistDetail = await (0, getWishlistDetailByWishlistId_dao_1.getWishlistDetailByWishlistId)(wishlist_id);
        if (!wishlistDetail) {
            return new patterns_1.NotFoundResponse('Wishlist is empty').generate();
        }
        const wishlist = await (0, getWishlistById_dao_1.getWishlistById)(SERVER_TENANT_ID, wishlist_id);
        if (!wishlist) {
            return new patterns_1.NotFoundResponse('Wishlist not found').generate();
        }
        if (wishlist.user_id !== user.id) {
            return new patterns_1.UnauthorizedResponse('User is not authorized to access this wishlist').generate();
        }
        return {
            data: wishlistDetail,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.getWishlistByIdService = getWishlistByIdService;
