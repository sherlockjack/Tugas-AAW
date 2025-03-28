import { Request, Response } from "express";
import * as Service from './services';

export const getAllUserWishlistHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    const response = await Service.getAllUserWishlistService(user);
    return res.status(response.status).send(response.data);
}

export const getWishlistByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const response = await Service.getWishlistByIdService(id, user);
    return res.status(response.status).send(response.data);
}

export const createWishlistHandler = async (req: Request, res: Response) => {
    const { user, name } = req.body;
    const response = await Service.createWishlistService(user, name);
    return res.status(response.status).send(response.data);
}

export const updateWishlistHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const response = await Service.updateWishlistService(id, name);
    return res.status(response.status).send(response.data);
}

export const deleteWishlistHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Service.deleteWishlistService(id);
    return res.status(response.status).send(response.data);
}

export const addProductToWishlistHandler = async (req: Request, res: Response) => {
    const { user, wishlist_id, product_id } = req.body;
    const response = await Service.addProductToWishlistService(wishlist_id, product_id, user);
    return res.status(response.status).send(response.data);
}

export const removeProductFromWishlistHandler = async (req: Request, res: Response) => {
    const { user, id } = req.body;
    const response = await Service.removeProductFromWishlistService(id, user);
    return res.status(response.status).send(response.data);
}

//version 2= await Service.getAllUserWishlistService(user);


export const getAllUserWishlistHandlerV2 = async (req: Request, res: Response) => {
  try {
      // Ambil user dari JWT middleware (aman)
      const user = (req as any).user;
      
      // Validasi dengan optional chain + error message spesifik
      if (!user?.id) {
          return res.status(401).json({
              status: "error",
              message: "Invalid user credentials"
          });
      }

      const response = await Service.getAllUserWishlistService(user.id);
      
      return res.status(200).json({
          status: "success",
          data: response.data
      });

  } catch (error) {
      // Handle error type safety
      console.error("Error:", error);
      
      // Type-safe error message
      const errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to process request';

      return res.status(500).json({
          status: "error",
          message: "Internal server error",
          details: errorMessage
      });
  }
}

  
  export const createWishlistV2Handler = async (req: Request, res: Response) => {
    try {
        const { user, name } = req.body;
        const response = await Service.createWishlistService(user, name);
        return res.status(response.status).send(response.data);
    } catch (error) {
        // Log error untuk debugging
        console.error("Internal Server Error:", error);

        // Respons error terstruktur
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
            details: error instanceof Error ? error.message : "An unexpected error occurred",
        });
    }
};
