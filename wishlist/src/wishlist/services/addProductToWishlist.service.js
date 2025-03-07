"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToWishlistService = void 0;
const patterns_1 = require("@src/commons/patterns");
const addProductToWishlist_dao_1 = require("../dao/addProductToWishlist.dao");
const getWishlistById_dao_1 = require("../dao/getWishlistById.dao");
const addProductToWishlistService = async (wishlist_id, product_id, user) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server tenant ID is missing').generate();
        }
        if (!user.id) {
            return new patterns_1.InternalServerErrorResponse('User ID is missing').generate();
        }
        const wishlist = await (0, getWishlistById_dao_1.getWishlistById)(SERVER_TENANT_ID, wishlist_id);
        if (!wishlist) {
            return new patterns_1.InternalServerErrorResponse('Wishlist not found').generate();
        }
        if (wishlist.user_id !== user.id) {
            return new patterns_1.InternalServerErrorResponse('User is not authorized to add product to this wishlist').generate();
        }
        const wishlistDetailData = {
            product_id,
            wishlist_id,
        };
        const wishlistDetail = await (0, addProductToWishlist_dao_1.addProductToWishlist)(wishlistDetailData);
        return {
            data: wishlistDetail,
            status: 201,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.addProductToWishlistService = addProductToWishlistService;
