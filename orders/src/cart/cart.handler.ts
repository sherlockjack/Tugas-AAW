import { Request, Response } from "express";
import * as Service from './services';

export const getAllCartItemsHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const response = await Service.getAllCartItemsService(user);
    return res.status(response.status).send(response.data);
}

export const addItemToCartHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { product_id, quantity } = req.body;
    const response = await Service.addItemToCartService(user, product_id, quantity);
    return res.status(response.status).send(response.data);
}

export const editCartItemHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { cart_id, quantity } = req.body;
    const response = await Service.editCartItemService(user, cart_id, quantity);
    return res.status(response.status).send(response.data);
}

export const deleteCartItemHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { product_id } = req.body;
    const response = await Service.deleteCartItemService(user, product_id);
    return res.status(response.status).send(response.data);
}

//version 2
export const addItemToCartHandlerV2 = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const { product_id, quantity } = req.body;

        const response = await Service.addItemToCartService(user, product_id, quantity);

        // Handle expected service errors
        if (response.status >= 400) {
            let message = "Error processing request";
            let details = null;

            if (response.data && typeof response.data === 'object' && 'message' in response.data) {
                message = response.data.message;
            }
            if (response.data && typeof response.data === 'object' && 'details' in response.data) {
                details = response.data.details;
            }

            return res.status(response.status).json({
                code: response.status,
                message: message,
                details: details,
            });
        }

        // Success response
        return res.status(response.status).json({
            code: response.status,
            data: response.data,
            message: "Item added to cart successfully"
        });

    } catch (error: any) { // Explicitly type error as any or Error
        // Handle unexpected errors
        console.error("Unexpected error:", error);

        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
            details: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
};