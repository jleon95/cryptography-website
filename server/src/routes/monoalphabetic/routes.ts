import { Router } from "express";
import hintController from "./hint/hint.controller.js";
import newTextController from "./new_text/new_text.controller.js";
import revealTextController from "./reveal_text/reveal_text.controller.js";
import scheduleDeletionOfExpiredSessions from "./scheduled_jobs/delete_expired_sessions.js";
import updateTextController from "./update_text/update_text.controller.js";
import validationController from "./validation/validation.controller.js";

const monoalphabetic = Router()
  .use(newTextController)
  .use(updateTextController)
  .use(revealTextController)
  .use(hintController)
  .use(validationController);
scheduleDeletionOfExpiredSessions();

export default Router().use("/monoalphabetic", monoalphabetic);
