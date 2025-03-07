"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategorySchema = void 0;
const zod_1 = require("zod");
exports.editCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        category_id: zod_1.z.string({ required_error: "Category ID is required" }).uuid(),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    })
});
