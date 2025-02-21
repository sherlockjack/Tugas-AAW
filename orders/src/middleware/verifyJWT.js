"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("../commons/patterns/exceptions");
const verifyJWT = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!token) {
            return res.status(401).json(new exceptions_1.UnauthenticatedResponse("No token provided").generate());
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (SERVER_TENANT_ID && decoded.tenant_id !== SERVER_TENANT_ID) {
            return res.status(401).json(new exceptions_1.UnauthenticatedResponse("Invalid tenant").generate());
        }
        req.body.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json(new exceptions_1.UnauthenticatedResponse("Invalid token").generate());
    }
};
exports.verifyJWT = verifyJWT;
