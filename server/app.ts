import type { AddressInfo } from "node:net";
import cors from "cors";
import Debug from "debug";
import express, { type NextFunction, type Request, type Response } from "express";
import { env as validEnv } from "./src/env.js";
import monoalphabeticRoutes from "./src/routes/monoalphabetic/routes.js";
import ping from "./src/routes/ping.controller.js";

interface HttpError extends Error {
  status?: number;
}

const debug = Debug("my express app");
const app = express();

// ===== CORS Configuration =====
// Enable CORS for frontend requests
app.use(
  cors({
    origin: validEnv.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Custom CORS headers for cross-origin requests with credentials
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", validEnv.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// ===== Request Body Parsing =====
// Parse incoming JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Route Handlers =====
// Process API requests
app.use(monoalphabeticRoutes);
app.use(ping);

// ===== 404 Handler =====
// Catch unmatched requests and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new Error("Not Found") as HttpError;
  err.status = 404;
  next(err);
});

// ===== Error Handlers =====
// Development: include full error details with stack trace
if (app.get("env") === "development") {
  app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    const body = { message: err.message, error: err };
    res.status(err.status || 500).send(body);
  });
}

// Production: hide error details from client
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  const body = { message: err.message, error: {} };
  res.status(err.status || 500).send(body);
});

app.set("port", 1337);

const server = app.listen(app.get("port"), () => {
  debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});
