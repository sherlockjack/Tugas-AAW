"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToWishlistSchema = void 0;
const zod_1 = require("zod");
exports.addProductToWishlistSchema = zod_1.z.object({
    body: zod_1.z.object({
        wishlist_id: zod_1.z.string().uuid(),
        product_id: zod_1.z.string().uuid(),
    }),
});
