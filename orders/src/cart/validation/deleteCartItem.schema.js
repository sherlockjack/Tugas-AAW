"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItemSchema = void 0;
const zod_1 = require("zod");
exports.deleteCartItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        product_id: zod_1.z.string().uuid(),
    })
});
