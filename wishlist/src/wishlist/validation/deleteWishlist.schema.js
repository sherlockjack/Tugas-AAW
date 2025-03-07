"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistSchema = void 0;
const zod_1 = require("zod");
exports.deleteWishlistSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
});
