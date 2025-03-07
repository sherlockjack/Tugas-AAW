"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (err) {
            const error = err;
            if (error instanceof zod_1.z.ZodError || error.name === 'ZodError') {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.issues.map(issue => ({
                        message: issue.message,
                        path: issue.path
                    }))
                });
            }
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    };
};
exports.validate = validate;
