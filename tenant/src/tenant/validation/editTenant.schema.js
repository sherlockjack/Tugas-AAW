"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTenantSchema = void 0;
const zod_1 = require("zod");
exports.editTenantSchema = zod_1.z.object({
    params: zod_1.z.object({
        old_tenant_id: zod_1.z.string().uuid(),
    }),
    body: zod_1.z.object({
        tenant_id: zod_1.z.string().uuid().optional(),
        owner_id: zod_1.z.string().uuid().optional(),
        name: zod_1.z.string().optional(),
    })
});
