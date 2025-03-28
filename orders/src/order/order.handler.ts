import { Request, Response } from "express";
import * as Service from "./services";

export const getAllOrdersHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const response = await Service.getAllOrdersService(user);
    return res.status(response.status).send(response.data);
}

export const getOrderDetailHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { orderId } = req.params;
    const response = await Service.getOrderDetailService(user, orderId);
    return res.status(response.status).send(response.data);
}

export const placeOrderHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { shipping_provider } = req.body;
    const response = await Service.placeOrderService(user, shipping_provider);
    return res.status(response.status).send(response.data);
}

export const payOrderHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { payment_method, payment_reference, amount } = req.body;
    const response = await Service.payOrderService(orderId, payment_method, payment_reference, amount);
    return res.status(response.status).send(response.data);
}

export const cancelOrderHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { user } = req.body;
    const response = await Service.cancelOrderService(user, orderId);
    return res.status(response.status).send(response.data);
}


//version 2
export const placeOrderHandlerV2 = async (req: Request, res: Response) => {
    try {
        const { user, shipping_provider } = req.body;
        const response = await Service.placeOrderService(user, shipping_provider);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Error in placeOrderHandlerV2:", error);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Terjadi kesalahan internal. Silakan coba lagi nanti.",
        });
    }
};

// handlers/order.handler.ts
export const getAllOrdersHandlerV2 = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        // Panggil service dengan parameter yang divalidasi
        const response = await Service.getAllOrdersService(user);

        return res.status(response.status).json(response.data);
    } 
    catch (error: unknown) {
        console.error("Error in getAllOrdersHandlerV2:", error);
    
        let errorMessage = "Terjadi kesalahan internal saat mengambil data order.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
    
        return res.status(500).json({
            code: 500,
            message: errorMessage,
            details: errorMessage || "Tidak ada detail tambahan."
        });
    }
    
};