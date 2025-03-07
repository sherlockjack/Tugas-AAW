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
exports.deleteCartItemHandler = exports.editCartItemHandler = exports.addItemToCartHandler = exports.getAllCartItemsHandler = void 0;
const Service = __importStar(require("./services"));
const getAllCartItemsHandler = async (req, res) => {
    const { user } = req.body;
    const response = await Service.getAllCartItemsService(user);
    return res.status(response.status).send(response.data);
};
exports.getAllCartItemsHandler = getAllCartItemsHandler;
const addItemToCartHandler = async (req, res) => {
    const { user } = req.body;
    const { product_id, quantity } = req.body;
    const response = await Service.addItemToCartService(user, product_id, quantity);
    return res.status(response.status).send(response.data);
};
exports.addItemToCartHandler = addItemToCartHandler;
const editCartItemHandler = async (req, res) => {
    const { user } = req.body;
    const { cart_id, quantity } = req.body;
    const response = await Service.editCartItemService(user, cart_id, quantity);
    return res.status(response.status).send(response.data);
};
exports.editCartItemHandler = editCartItemHandler;
const deleteCartItemHandler = async (req, res) => {
    const { user } = req.body;
    const { product_id } = req.body;
    const response = await Service.deleteCartItemService(user, product_id);
    return res.status(response.status).send(response.data);
};
exports.deleteCartItemHandler = deleteCartItemHandler;
