"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTenantSchema = void 0;
const zod_1 = require("zod");
exports.createTenantSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
    })
});
