"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrderSchema = void 0;
const zod_1 = require("zod");
exports.placeOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        shipping_provider: zod_1.z.enum(['JNE', 'TIKI', 'SICEPAT', 'GOSEND', 'GRAB_EXPRESS']),
    })
});
