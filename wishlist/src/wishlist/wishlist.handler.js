"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductFromWishlistHandler = exports.addProductToWishlistHandler = exports.deleteWishlistHandler = exports.updateWishlistHandler = exports.createWishlistHandler = exports.getWishlistByIdHandler = exports.getAllUserWishlistHandler = void 0;
const Service = __importStar(require("./services"));
const getAllUserWishlistHandler = async (req, res) => {
    const { user } = req.body;
    const response = await Service.getAllUserWishlistService(user);
    return res.status(response.status).send(response.data);
};
exports.getAllUserWishlistHandler = getAllUserWishlistHandler;
const getWishlistByIdHandler = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    const response = await Service.getWishlistByIdService(id, user);
    return res.status(response.status).send(response.data);
};
exports.getWishlistByIdHandler = getWishlistByIdHandler;
const createWishlistHandler = async (req, res) => {
    const { user, name } = req.body;
    const response = await Service.createWishlistService(user, name);
    return res.status(response.status).send(response.data);
};
exports.createWishlistHandler = createWishlistHandler;
const updateWishlistHandler = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const response = await Service.updateWishlistService(id, name);
    return res.status(response.status).send(response.data);
};
exports.updateWishlistHandler = updateWishlistHandler;
const deleteWishlistHandler = async (req, res) => {
    const { id } = req.params;
    const response = await Service.deleteWishlistService(id);
    return res.status(response.status).send(response.data);
};
exports.deleteWishlistHandler = deleteWishlistHandler;
const addProductToWishlistHandler = async (req, res) => {
    const { user, wishlist_id, product_id } = req.body;
    const response = await Service.addProductToWishlistService(wishlist_id, product_id, user);
    return res.status(response.status).send(response.data);
};
exports.addProductToWishlistHandler = addProductToWishlistHandler;
const removeProductFromWishlistHandler = async (req, res) => {
    const { user, id } = req.body;
    const response = await Service.removeProductFromWishlistService(id, user);
    return res.status(response.status).send(response.data);
};
exports.removeProductFromWishlistHandler = removeProductFromWishlistHandler;
