import express from "express";
import { validate } from "@src/middleware/validate";
import * as Validation from "./validation";
import * as Handler from "./user.handler";

const router = express.Router();


// V00
router.post("/register", validate(Validation.registerSchema), Handler.registerHandler);
router.post("/login", validate(Validation.loginSchema), Handler.loginHandler);
router.post("/verify-token", validate(Validation.verifyTokenSchema), Handler.verifyTokenHandler);
router.post("/verify-admin-token", validate(Validation.verifyAdminTokenSchema), Handler.verifyAdminTokenHandler);



//Version 2
router.post("/v2/auth/login", validate(Validation.loginSchema), Handler.v2LoginHandler);
router.post("/v2/auth/register", validate(Validation.registerSchema), Handler.v2RegisterHandler);
router.post("/v2/auth/token-verification",validate(Validation.v2VerifyTokenSchema), Handler.v2VerifyTokenHandler);

export default router;

