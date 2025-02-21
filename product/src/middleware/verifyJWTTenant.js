"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTTenant = void 0;
const exceptions_1 = require("../commons/patterns/exceptions");
const services_1 = require("@src/auth/services");
const verifyJWTTenant = async (req, res, next) => {
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
        req.body.user = verifiedPayload.data.user;
        next();
    }
    catch (error) {
        return res.status(401).json(new exceptions_1.UnauthenticatedResponse("Invalid token").generate());
    }
};
exports.verifyJWTTenant = verifyJWTTenant;
