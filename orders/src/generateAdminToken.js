"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAdminToken = void 0;
const patterns_1 = require("@src/commons/patterns");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserByUsername_dao_1 = require("./auth/dao/getUserByUsername.dao");
const insertNewUser_dao_1 = require("./auth/dao/insertNewUser.dao");
const GenerateAdminToken = async (username, password) => {
    try {
        const SERVER_TENANT_ID = process.env.ADMIN_TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse("Server tenant ID is missing").generate();
        }
        const user = await (0, getUserByUsername_dao_1.getUserByUsername)(username, SERVER_TENANT_ID);
        if (!user) {
            return new patterns_1.NotFoundResponse("User not found").generate();
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return new patterns_1.NotFoundResponse("Invalid password").generate();
        }
        const payload = {
            id: user.id,
            tenant_id: user.tenant_id,
        };
        const secret = process.env.ADMIN_JWT_SECRET;
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: "1d",
        });
        return {
            data: {
                token,
            },
            status: 200
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.GenerateAdminToken = GenerateAdminToken;
const registerAdmin = async (username, email, password, full_name, address, phone_number) => {
    const SERVER_TENANT_ID = process.env.ADMIN_TENANT_ID;
    if (!SERVER_TENANT_ID) {
        return new patterns_1.InternalServerErrorResponse("Server tenant ID is missing").generate();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const userData = {
        tenant_id: SERVER_TENANT_ID,
        username,
        email,
        password: hashedPassword,
        full_name,
        address,
        phone_number
    };
    const newUser = await (0, insertNewUser_dao_1.insertNewUser)(userData);
    return {
        data: newUser,
        status: 201
    };
};
async function getAdminExistence() {
    if (!process.env.ADMIN_TENANT_ID) {
        throw new Error("ADMIN_TENANT_ID is missing");
    }
    if (!process.env.ADMIN_JWT_SECRET) {
        throw new Error("ADMIN_JWT_SECRET is missing");
    }
    console.log(await (0, getUserByUsername_dao_1.getUserByUsername)("admin", process.env.ADMIN_TENANT_ID));
    return await (0, getUserByUsername_dao_1.getUserByUsername)("admin", process.env.ADMIN_TENANT_ID) ? true : false;
}
(async () => {
    if (await getAdminExistence()) {
        console.log("Admin already exists");
    }
    else {
        await registerAdmin("admin", "admin@admin.com", "Admin123", "admin", "admin", "admin");
    }
})();
(async () => {
    console.log(await (0, exports.GenerateAdminToken)("admin", "Admin123"));
})();
