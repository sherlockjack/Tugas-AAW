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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./getAllProducts.service"), exports);
__exportStar(require("./getManyProductDatasById.service"), exports);
__exportStar(require("./getProductById.service"), exports);
__exportStar(require("./getProductByCategory.service"), exports);
__exportStar(require("./createProduct.service"), exports);
__exportStar(require("./getAllCategories.service"), exports);
__exportStar(require("./createCategory.service"), exports);
__exportStar(require("./editProduct.service"), exports);
__exportStar(require("./editCategory.service"), exports);
__exportStar(require("./deleteProduct.service"), exports);
__exportStar(require("./deleteCategory.service"), exports);
