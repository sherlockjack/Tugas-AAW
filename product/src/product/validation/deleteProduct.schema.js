"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = void 0;
const zod_1 = require("zod");
exports.deleteProductSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Product ID is required" }).uuid(),
    })
});
