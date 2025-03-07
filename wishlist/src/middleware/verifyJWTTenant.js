"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTTenant = void 0;
const axios = require("axios");
const exceptions_1 = require("../commons/patterns/exceptions");

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:8000";

const verifyJWTTenant = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!token) {
            return res.status(401).send({ message: "Invalid token" });
        }

        // Panggil Auth Service untuk verifikasi token
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
        req.body.user = verifiedPayload.data.user;
        next();
    } catch (error) {
        return res.status(401).json(new exceptions_1.UnauthenticatedResponse("Invalid token").generate());
    }
};

exports.verifyJWTTenant = verifyJWTTenant;
