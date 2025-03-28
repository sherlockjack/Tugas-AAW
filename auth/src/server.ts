import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

import authRoutes from "./user/user.routes"

import express_prom_bundle from "express-prom-bundle";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app: Express = express();

// Load swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));

// Serve Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Prometheus metrics middleware
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'Authentication' },
  promClient: {
    collectDefaultMetrics: {}
  }
});

// Middleware
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Marketplace - Authentication API',
    version: '1.0.0'
  });
});

app.use((req: Request, res: Response) => {
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

export default app;