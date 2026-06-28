import express from 'express';
import { AddressInfo } from "net";
import monoalphabeticRoutes from './src/routes/monoalphabetic/routes.js';
import ping from './src/routes/ping.controller.js';
import { Request, Response, NextFunction } from 'express';
import cors from "cors";
import Debug from 'debug';
import { env as validEnv } from './src/env.js';

interface HttpError extends Error {
    status?: number;
}

const debug = Debug('my express app');
const app = express();

// ===== CORS Configuration =====
// Enable CORS for frontend requests
app.use(cors({ origin: validEnv.FRONTEND_ADDRESS, methods: ["GET", "POST"], credentials: true }));

// Custom CORS headers for cross-origin requests with credentials
app.use(function (_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', validEnv.FRONTEND_ADDRESS);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    const err = new Error('Not Found') as HttpError;
    err.status = 404;
    next(err);
});

// ===== Error Handlers =====
// Development: include full error details with stack trace
if (app.get('env') === 'development') {
    app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        let body = { message: err.message, error: err };
        res.status(err.status || 500).send(body);
    });
}

// Production: hide error details from client
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    let body = { message: err.message, error: {} };
    res.status(err.status || 500).send(body);
});

app.set('port', 1337);

const server = app.listen(app.get('port'), function () {
  debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});