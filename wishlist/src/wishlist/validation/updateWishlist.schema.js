"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWishlistSchema = void 0;
const zod_1 = require("zod");
exports.updateWishlistSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(255).optional(),
    }),
});
