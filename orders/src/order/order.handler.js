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
exports.cancelOrderHandler = exports.payOrderHandler = exports.placeOrderHandler = exports.getOrderDetailHandler = exports.getAllOrdersHandler = void 0;
const Service = __importStar(require("./services"));
const getAllOrdersHandler = async (req, res) => {
    const { user } = req.body;
    const response = await Service.getAllOrdersService(user);
    return res.status(response.status).send(response.data);
};
exports.getAllOrdersHandler = getAllOrdersHandler;
const getOrderDetailHandler = async (req, res) => {
    const { user } = req.body;
    const { orderId } = req.params;
    const response = await Service.getOrderDetailService(user, orderId);
    return res.status(response.status).send(response.data);
};
exports.getOrderDetailHandler = getOrderDetailHandler;
const placeOrderHandler = async (req, res) => {
    const { user } = req.body;
    const { shipping_provider } = req.body;
    const response = await Service.placeOrderService(user, shipping_provider);
    return res.status(response.status).send(response.data);
};
exports.placeOrderHandler = placeOrderHandler;
const payOrderHandler = async (req, res) => {
    const { orderId } = req.params;
    const { payment_method, payment_reference, amount } = req.body;
    const response = await Service.payOrderService(orderId, payment_method, payment_reference, amount);
    return res.status(response.status).send(response.data);
};
exports.payOrderHandler = payOrderHandler;
const cancelOrderHandler = async (req, res) => {
    const { orderId } = req.params;
    const { user } = req.body;
    const response = await Service.cancelOrderService(user, orderId);
    return res.status(response.status).send(response.data);
};
exports.cancelOrderHandler = cancelOrderHandler;
