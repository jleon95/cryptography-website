import type { NextFunction, Request, Response } from "express";
import type { MonoalphabeticService } from "../services/monoalphabetic.service.js";

export class MonoalphabeticController {
  constructor(private monoalphabeticService: MonoalphabeticService) {}

  public createSession = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {};

  public requestHint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {};

  public validateMapping = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {};

  public updateDifficulty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {};

  public revealText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {};
}
