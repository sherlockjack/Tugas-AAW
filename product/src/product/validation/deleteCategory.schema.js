"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategorySchema = void 0;
const zod_1 = require("zod");
exports.deleteCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        category_id: zod_1.z.string({ required_error: "Category ID is required" }).uuid(),
    })
});
