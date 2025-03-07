"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyProductDatasByIdSchema = void 0;
const zod_1 = require("zod");
exports.getManyProductDatasByIdSchema = zod_1.z.object({
    body: zod_1.z.object({
        productIds: zod_1.z.array(zod_1.z.string().uuid()).nonempty(),
    }),
});
