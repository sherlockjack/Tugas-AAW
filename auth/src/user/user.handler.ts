import { Request, Response } from "express";
import * as Service from "./services";
import { z } from "zod";
export const loginHandler = async (req: Request, res: Response) => {
    console.log("Login handler triggered");
    const { username, password } = req.body;
    const response = await Service.loginService(username, password);
    return res.status(response.status).json(response.data);
}

export const registerHandler = async (req: Request, res: Response) => {
    const { username, email, password, full_name, address, phone_number } = req.body;
    const response = await Service.registerService(username, email, password, full_name, address, phone_number);
    return res.status(response.status).json(response.data);
}

export const verifyTokenHandler = async (req: Request, res: Response) => {
    const { token } = req.body;
    const response = await Service.verifyTokenService(token);
    return res.status(response.status).json(response.data);
}

export const verifyAdminTokenHandler = async (req: Request, res: Response) => {
    const { token } = req.body;
    const response = await Service.verifyAdminTokenService(token);
    return res.status(response.status).json(response.data);
}


// version 2

export const v2LoginHandler = async (req: Request, res: Response) => {
    console.log("v2 Login handler triggered");
    try {
        const { username, password } = req.body;
        const response = await Service.loginService(username, password);
        
        // Pastikan response dari service konsisten
        return res.status(response.status).json({
            success: response.status >= 200 && response.status < 300,
            data: response.data,
            error: null
        });
    } catch (error) {
        console.error("Login error:", error);
        
        // Format error response
        let statusCode = 500;
        let errorMessage = "Internal server error";
        
        return res.status(statusCode).json({
            success: false,
            data: null,
            error: {
                code: statusCode.toString(),
                message: errorMessage
            }
        });
    }
};


export const v2RegisterHandler = async (req: Request, res: Response) => {
    try {
        const { username, email, password, full_name, address, phone_number } = req.body;
        const response = await Service.registerService(username, email, password, full_name, address, phone_number);
        
        // Format response sukses
        return res.status(response.status).json({
            success: response.status >= 200 && response.status < 300,
            data: response.data,
            error: null
        });
    } catch (error) {
        console.error("Registration error:", error);
        
        // Format response error
        let statusCode = 500;
        let errorMessage = "Internal server error";
        
        if (error instanceof z.ZodError) {
            statusCode = 400;
            errorMessage = error.errors.map(e => e.message).join(", ");
        } else if (error instanceof Error) {
            statusCode = 400; // Sesuaikan dengan jenis error yang mungkin
            errorMessage = error.message;
        }
        
        return res.status(statusCode).json({
            success: false,
            data: null,
            error: {
                code: statusCode.toString(),
                message: errorMessage
            }
        });
    }
};

export const v2VerifyTokenHandler = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const verificationResult = await Service.verifyTokenService(token);
  
      // Respons sukses terstruktur
      return res.status(200).json({
        success: true,
        data: verificationResult.data,
      });
    } catch (error: any) {
      // Error handling terstruktur
      console.error(`v2VerifyTokenError: ${error.message}`);
  
      const statusCode = error.statusCode || 500;
      const errorMessage = error.message || "Internal Server Error";
  
      return res.status(statusCode).json({
        success: false,
        error: {
          code: statusCode,
          message: errorMessage,
          details: "Gagal memverifikasi token. Periksa token atau coba lagi.",
        },
      });
    }
  };  