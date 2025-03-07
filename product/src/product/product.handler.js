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
exports.deleteCategoryHandler = exports.deleteProductHandler = exports.editCategoryHandler = exports.editProductHandler = exports.createCategoryHandler = exports.getAllCategoryHandler = exports.createProductHandler = exports.getProductByCategoryHandler = exports.getProductByIdHandler = exports.getManyProductDatasByIdHandler = exports.getAllProductsHandler = void 0;
const Service = __importStar(require("./services"));
const getAllProductsHandler = async (req, res) => {
    const response = await Service.getAllProductsService();
    return res.status(response.status).send(response.data);
};
exports.getAllProductsHandler = getAllProductsHandler;
const getManyProductDatasByIdHandler = async (req, res) => {
    const { productIds } = req.body;
    const response = await Service.getManyProductDatasByIdService(productIds);
    return res.status(response.status).send(response.data);
};
exports.getManyProductDatasByIdHandler = getManyProductDatasByIdHandler;
const getProductByIdHandler = async (req, res) => {
    const { id } = req.params;
    const response = await Service.getProductByIdService(id);
    return res.status(response.status).send(response.data);
};
exports.getProductByIdHandler = getProductByIdHandler;
const getProductByCategoryHandler = async (req, res) => {
    const { category_id } = req.params;
    const response = await Service.getProductByCategoryService(category_id);
    return res.status(response.status).send(response.data);
};
exports.getProductByCategoryHandler = getProductByCategoryHandler;
const createProductHandler = async (req, res) => {
    const { name, description, price, quantity_available, category_id } = req.body;
    const response = await Service.createProductService(name, description, price, quantity_available, category_id);
    return res.status(response.status).send(response.data);
};
exports.createProductHandler = createProductHandler;
const getAllCategoryHandler = async (req, res) => {
    const response = await Service.getAllCategoriesService();
    return res.status(response.status).send(response.data);
};
exports.getAllCategoryHandler = getAllCategoryHandler;
const createCategoryHandler = async (req, res) => {
    const { name } = req.body;
    const response = await Service.createCategoryService(name);
    return res.status(response.status).send(response.data);
};
exports.createCategoryHandler = createCategoryHandler;
const editProductHandler = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity_available, category_id } = req.body;
    const response = await Service.editProductService(id, name, description, price, quantity_available, category_id);
    return res.status(response.status).send(response.data);
};
exports.editProductHandler = editProductHandler;
const editCategoryHandler = async (req, res) => {
    const { category_id } = req.params;
    const { name } = req.body;
    const response = await Service.editCategoryService(category_id, name);
    return res.status(response.status).send(response.data);
};
exports.editCategoryHandler = editCategoryHandler;
const deleteProductHandler = async (req, res) => {
    const { id } = req.params;
    const response = await Service.deleteProductService(id);
    return res.status(response.status).send(response.data);
};
exports.deleteProductHandler = deleteProductHandler;
const deleteCategoryHandler = async (req, res) => {
    const { category_id } = req.params;
    const response = await Service.deleteCategoryService(category_id);
    return res.status(response.status).send(response.data);
};
exports.deleteCategoryHandler = deleteCategoryHandler;
