"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProductSchema = void 0;
const zod_1 = require("zod");
exports.editProductSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Product ID is required" }).uuid(),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        quantity_available: zod_1.z.number().optional(),
        category_id: zod_1.z.string().uuid().optional(),
    })
});
