// src/routes/monoalphabetic.routes.ts
import { Router } from "express";
import { MonoalphabeticController } from "../minigames/monoalphabetic/controllers/monoalphabetic.controller.js";
import { MonoalphabeticRepository } from "../minigames/monoalphabetic/repositories/monoalphabetic.repository.js";
import { MonoalphabeticService } from "../minigames/monoalphabetic/services/monoalphabetic.service.js";
import prisma from "../prisma/prisma-client.js";

const monoRouter = Router();

// Dependency injection
const repository = new MonoalphabeticRepository(prisma);
const service = new MonoalphabeticService(repository);
const controller = new MonoalphabeticController(service);

monoRouter.post("/request_new_text", controller.createSession);
monoRouter.post("/request_hint", controller.requestHint);
monoRouter.post("/validate_solution", controller.validateMapping);
monoRouter.post("/update_text", controller.updateDifficulty);
monoRouter.post("/reveal_text", controller.revealText);

export default Router().use("/monoalphabetic", monoRouter);
