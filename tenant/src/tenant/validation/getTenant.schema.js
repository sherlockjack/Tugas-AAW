"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantSchema = void 0;
const zod_1 = require("zod");
exports.getTenantSchema = zod_1.z.object({
    params: zod_1.z.object({
        tenant_id: zod_1.z.string().uuid(),
    })
});
