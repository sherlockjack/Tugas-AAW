"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByCategorySchema = void 0;
const zod_1 = require("zod");
exports.getProductByCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        category_id: zod_1.z.string({ required_error: "Category ID is required" }).uuid(),
    })
});
