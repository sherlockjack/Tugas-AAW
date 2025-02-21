"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetailSchema = void 0;
const zod_1 = require("zod");
exports.getOrderDetailSchema = zod_1.z.object({
    params: zod_1.z.object({
        orderId: zod_1.z.string().uuid(),
    })
});
