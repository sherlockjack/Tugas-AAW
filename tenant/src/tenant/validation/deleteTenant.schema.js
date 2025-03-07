"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTenantSchema = void 0;
const zod_1 = require("zod");
exports.deleteTenantSchema = zod_1.z.object({
    body: zod_1.z.object({
        tenant_id: zod_1.z.string().uuid(),
    })
});
