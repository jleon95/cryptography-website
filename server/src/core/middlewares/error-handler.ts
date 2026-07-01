import type { NextFunction, Request, Response } from "express";
import logger from "../../../logger.js";
import { env as validEnv } from "../../env.js";
import { AppError } from "../errors/errors.js";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  const isDev = validEnv.NODE_ENV === "development";
  return res.status(500).json({
    message: "Something went wrong internally.",
    ...(isDev ? { details: err.message, stack: err.stack } : {}),
  });
};
