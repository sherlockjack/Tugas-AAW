import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from "axios";
    
export const GenerateAdminToken = async (
    username: string,
    password: string
) => {
    try {
        const SERVER_TENANT_ID = process.env.ADMIN_TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse("Server tenant ID is missing").generate();
        }

        // Panggil API `auth` untuk mendapatkan user berdasarkan username
        const response = await axios.get(`${process.env.AUTH_URL}/api/users/${username}`, {
            params: { tenant_id: SERVER_TENANT_ID }
        });

        const user = response.data;
        if (!user) {
            return new NotFoundResponse("User not found").generate();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new NotFoundResponse("Invalid password").generate();
        }

        const payload = {
            id: user.id,
            tenant_id: user.tenant_id,
        };
        const secret: string = process.env.ADMIN_JWT_SECRET as string;
        const token = jwt.sign(payload, secret, { expiresIn: "1d" });

        return { data: { token }, status: 200 };
    } catch (err: any) {
        return new InternalServerErrorResponse(err.message).generate();
    }
};

const registerAdmin = async (username: string, email: string, password: string, full_name: string, address: string, phone_number: string) => {
    const SERVER_TENANT_ID = process.env.ADMIN_TENANT_ID;
    if (!SERVER_TENANT_ID) {
        return new InternalServerErrorResponse("Server tenant ID is missing").generate();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        // Kirim data ke microservice `auth`
        const response = await axios.post(`${process.env.AUTH_URL}/api/users/register`, {
            tenant_id: SERVER_TENANT_ID,
            username,
            email,
            password: hashedPassword,
            full_name,
            address,
            phone_number
        });

        return { data: response.data, status: 201 };
    } catch (error: any) {
        return new InternalServerErrorResponse(error.message).generate();
    }
};

async function getAdminExistence() {
    if (!process.env.ADMIN_TENANT_ID) {
        throw new Error("ADMIN_TENANT_ID is missing");
    }
    if (!process.env.ADMIN_JWT_SECRET) {
        throw new Error("ADMIN_JWT_SECRET is missing");
    }

    try {
        const response = await axios.get(`${process.env.AUTH_URL}/api/users/admin-existence`, {
            params: { tenant_id: process.env.ADMIN_TENANT_ID }
        });

        return response.data.exists;
    } catch (error: any) {
        return false;
    }
}


(async () => {
    if (await getAdminExistence()) {
        console.log("Admin already exists");
    } else {
        await registerAdmin("admin", "admin@admin.com", "Admin123", "admin", "admin", "admin");
    }
})();

(async () => {
    console.log(await GenerateAdminToken("admin", "Admin123"));
})();

