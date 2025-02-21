"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Product name is required" }),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number({ required_error: "Product price is required" }),
        quantity_available: zod_1.z.number({ required_error: "Product stock is required" }),
        category_id: zod_1.z.string().uuid().optional(),
    })
});
