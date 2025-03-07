"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payOrderSchema = void 0;
const zod_1 = require("zod");
exports.payOrderSchema = zod_1.z.object({
    params: zod_1.z.object({
        orderId: zod_1.z.string().uuid(),
    }),
    body: zod_1.z.object({
        payment_method: zod_1.z.string(),
        payment_reference: zod_1.z.string(),
        amount: zod_1.z.number().int().positive(),
    })
});
