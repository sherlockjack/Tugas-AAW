"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTProduct = void 0;
const axios = require("axios");
const exceptions_1 = require("../commons/patterns/exceptions");

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:8000";
const TENANT_SERVICE_URL = process.env.TENANT_SERVICE_URL || "http://localhost:8003";

const verifyJWTProduct = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!token) {
            return res.status(401).send({ message: "Invalid token" });
        }

        // 1. Verifikasi Token dari Auth Service
        let payload;
        try {
            const response = await axios.post(`${AUTH_SERVICE_URL}/verify-token`, { token });
            payload = response.data;
        } catch (error) {
            return res.status(401).send({ message: "Invalid token" });
        }

        if (payload.status !== 200) {
            return res.status(401).send({ message: "Invalid token" });
        }

        const verifiedPayload = payload;
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return res.status(500).send({ message: "Server Tenant ID not found" });
        }

        // 2. Ambil Data Tenant dari Tenant Service
        let tenantPayload;
        try {
            const response = await axios.get(`${TENANT_SERVICE_URL}/tenants/${SERVER_TENANT_ID}`);
            tenantPayload = response.data;
        } catch (error) {
            return res.status(500).send({ message: "Server Tenant not found" });
        }

        if (tenantPayload.status !== 200 || !tenantPayload.data) {
            return res.status(500).send({ message: "Server Tenant not found" });
        }

        const verifiedTenantPayload = tenantPayload;

        // 3. Cek Kepemilikan Tenant
        if (verifiedPayload.data.user.id !== verifiedTenantPayload.data.tenants.owner_id) {
            return res.status(401).send({ message: "Invalid token" });
        }

        req.body.user = verifiedPayload.data.user;
        next();
    } catch (error) {
        return res.status(401).json(new exceptions_1.UnauthenticatedResponse("Invalid token").generate());
    }
};

exports.verifyJWTProduct = verifyJWTProduct;
