"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWishlistService = void 0;
const patterns_1 = require("@src/commons/patterns");
const updateWishlistById_dao_1 = require("../dao/updateWishlistById.dao");
const updateWishlistService = async (id, name) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse('Server tenant ID is missing').generate();
        }
        const wishlist = await (0, updateWishlistById_dao_1.updateWishlistById)(SERVER_TENANT_ID, id, {
            name
        });
        return {
            data: wishlist,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.updateWishlistService = updateWishlistService;
