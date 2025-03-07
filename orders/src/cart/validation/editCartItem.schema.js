"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCartItemSchema = void 0;
const zod_1 = require("zod");
exports.editCartItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        cart_id: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().nonnegative().optional(),
    })
});
