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
exports.deleteCartItemByProductId = void 0;
const db_1 = require("@src/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema = __importStar(require("@db/schema/orders/cart"));
const deleteCartItemByProductId = async (tenant_id, user_id, product_id) => {
    const result = await db_1.db
        .delete(schema.cart)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.cart.tenant_id, tenant_id), (0, drizzle_orm_1.eq)(schema.cart.user_id, user_id), (0, drizzle_orm_1.eq)(schema.cart.product_id, product_id)))
        .returning({
        id: schema.cart.id,
        product_id: schema.cart.product_id,
        quantity: schema.cart.quantity,
    });
    return result === null || result === void 0 ? void 0 : result[0];
};
exports.deleteCartItemByProductId = deleteCartItemByProductId;
