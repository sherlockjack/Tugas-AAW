"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTProduct = void 0;
const exceptions_1 = require("../commons/patterns/exceptions");
const services_1 = require("@src/auth/services");
const services_2 = require("@src/tenant/services");
const verifyJWTProduct = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!token) {
            return res.status(401).send({ message: "Invalid token" });
        }
        const payload = await (0, services_1.verifyAdminTokenService)(token);
        if (payload.status !== 200) {
            return res.status(401).send({ message: "Invalid token" });
        }
        const verifiedPayload = payload;
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return res.status(500).send({ message: "Server Tenant ID not found" });
        }
        const tenantPayload = await (0, services_2.getTenantService)(SERVER_TENANT_ID);
        if (tenantPayload.status !== 200 ||
            !tenantPayload.data) {
            return res.status(500).send({ message: "Server Tenant not found" });
        }
        const verifiedTenantPayload = tenantPayload;
        // Check for tenant ownership
        if (verifiedPayload.data.user.id !== verifiedTenantPayload.data.tenants.owner_id) {
            return res.status(401).send({ message: "Invalid token" });
        }
        req.body.user = verifiedPayload.data.user;
        next();
    }
    catch (error) {
        return res.status(401).json(new exceptions_1.UnauthenticatedResponse("Invalid token").generate());
    }
};
exports.verifyJWTProduct = verifyJWTProduct;
