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
exports.deleteTenantHandler = exports.editTenantHandler = exports.createTenantHandler = exports.getTenantHandler = void 0;
const Service = __importStar(require("./services"));
const getTenantHandler = async (req, res) => {
    const { tenant_id } = req.params;
    const response = await Service.getTenantService(tenant_id);
    return res.status(response.status).send(response.data);
};
exports.getTenantHandler = getTenantHandler;
const createTenantHandler = async (req, res) => {
    const { name, user } = req.body;
    const response = await Service.createTenantService(user.id, name);
    return res.status(response.status).send(response.data);
};
exports.createTenantHandler = createTenantHandler;
const editTenantHandler = async (req, res) => {
    const { old_tenant_id } = req.params;
    const { user, tenant_id, owner_id, name } = req.body;
    const response = await Service.editTenantService(old_tenant_id, user, tenant_id, owner_id, name);
    return res.status(response.status).send(response.data);
};
exports.editTenantHandler = editTenantHandler;
const deleteTenantHandler = async (req, res) => {
    const { user, tenant_id } = req.body;
    const response = await Service.deleteTenantService(user, tenant_id);
    return res.status(response.status).send(response.data);
};
exports.deleteTenantHandler = deleteTenantHandler;
