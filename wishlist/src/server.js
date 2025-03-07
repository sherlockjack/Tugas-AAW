"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./auth/user.routes"));
const order_routes_1 = __importDefault(require("./orders/order/order.routes"));
const cart_routes_1 = __importDefault(require("./orders/cart/cart.routes"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const tenant_routes_1 = __importDefault(require("./tenant/tenant.routes"));
const wishlist_routes_1 = __importDefault(require("./wishlist/wishlist.routes"));
const express_prom_bundle_1 = __importDefault(require("express-prom-bundle"));
const app = (0, express_1.default)();
// Prometheus metrics middleware
const metricsMiddleware = (0, express_prom_bundle_1.default)({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    customLabels: { project_name: 'marketplace-monolith' },
    promClient: {
        collectDefaultMetrics: {}
    }
});
// Middleware
app.use(metricsMiddleware);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', user_routes_1.default);
app.use('/api/order', order_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
app.use("/api/product", product_routes_1.default);
app.use("/api/tenant", tenant_routes_1.default);
app.use('/api/wishlist', wishlist_routes_1.default);
// Health check endpoint
app.get('/health', (_, res) => {
    res.status(200).json({ status: 'healthy' });
});
// Root endpoint
app.get('/', (_, res) => {
    res.status(200).json({
        message: 'Marketplace API',
        version: '1.0.0'
    });
});
app.use((req, res) => {
    res.status(404).json({
        message: 'Not Found',
        path: req.path
    });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
exports.default = app;
