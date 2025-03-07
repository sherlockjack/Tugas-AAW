"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductFromWishlistSchema = void 0;
const zod_1 = require("zod");
exports.removeProductFromWishlistSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
});
