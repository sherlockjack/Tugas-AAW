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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("@src/shared/middleware");
const Validation = __importStar(require("./validation"));
const Handler = __importStar(require("./product.handler"));
const router = express_1.default.Router();
router.get('', Handler.getAllProductsHandler);
router.get('/category', Handler.getAllCategoryHandler);
router.get('/:id', (0, middleware_1.validate)(Validation.getProductByIdSchema), Handler.getProductByIdHandler);
router.post('/many', (0, middleware_1.validate)(Validation.getManyProductDatasByIdSchema), Handler.getManyProductDatasByIdHandler);
router.get('/category/:category_id', (0, middleware_1.validate)(Validation.getProductByCategorySchema), Handler.getProductByCategoryHandler);
router.post('', middleware_1.verifyJWTProduct, (0, middleware_1.validate)(Validation.createProductSchema), Handler.createProductHandler);
router.post('/category', middleware_1.verifyJWTProduct, (0, middleware_1.validate)(Validation.createCategorySchema), Handler.createCategoryHandler);
router.put('/:id', middleware_1.verifyJWTProduct, (0, middleware_1.validate)(Validation.editProductSchema), Handler.editProductHandler);
router.put('/category/:category_id', middleware_1.verifyJWTProduct, (0, middleware_1.validate)(Validation.editCategorySchema), Handler.editCategoryHandler);
router.delete('/:id', middleware_1.verifyJWTProduct, (0, middleware_1.validate)(Validation.deleteProductSchema), Handler.deleteProductHandler);
router.delete('/category/:category_id', middleware_1.verifyJWTProduct, (0, middleware_1.validate)(Validation.deleteCategorySchema), Handler.deleteCategoryHandler);
exports.default = router;
