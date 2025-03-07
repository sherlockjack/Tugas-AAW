"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewTenant = void 0;
const schemaTenant = __importStar(require("@db/schema/tenant/tenants"));
const schemaTenantDetails = __importStar(require("@db/schema/tenant/tenantDetails"));
const db_1 = require("@src/db");
const createNewTenant = async (owner_id, name) => {
    const result = await db_1.db.transaction(async (tx) => {
        const resultTenant = await tx
            .insert(schemaTenant.tenants)
            .values({
            owner_id
        })
            .returning();
        if (!resultTenant || !resultTenant[0].id) {
            await tx.rollback();
            return null;
        }
        const resultTenantDetails = await tx
            .insert(schemaTenantDetails.tenantDetails)
            .values({
            tenant_id: resultTenant[0].id,
            name
        })
            .returning();
        if (!resultTenant || !resultTenantDetails) {
            await tx.rollback();
            return null;
        }
        return {
            tenants: resultTenant[0],
            tenantDetails: resultTenantDetails[0]
        };
    });
    return result;
};
exports.createNewTenant = createNewTenant;
