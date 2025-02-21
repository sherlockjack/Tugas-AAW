"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemToCartSchema = void 0;
const zod_1 = require("zod");
exports.addItemToCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        product_id: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive(),
    })
});
