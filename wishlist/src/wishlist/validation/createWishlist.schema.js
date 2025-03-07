"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWishlistSchema = void 0;
const zod_1 = require("zod");
exports.createWishlistSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(255),
    }),
});
