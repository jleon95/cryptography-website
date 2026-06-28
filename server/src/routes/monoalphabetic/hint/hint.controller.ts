import { type Request, type Response, Router } from "express";
import logger from "../../../../logger.js";
import type { HintRequest, HintResponse } from "../controller.models.js";
import type { LetterMapping } from "../logic.models.js";
import { createExpirationDate } from "../utils.js";
import { findCorrectLetterFromMapping } from "./hint.logic.js";
import {
  checkActiveMonoalphabeticSessionExists,
  consumeHint,
  getEncryptionMapping,
  getRemainingHints,
  touchMonoalphabeticSession,
} from "./hint.service.js";

const router = Router();

router.post("/hint", async (req: Request, res: Response) => {
  const requestBody: HintRequest = req.body;

  if (
    typeof requestBody.sessionData.sessionId === "string" &&
    (await checkActiveMonoalphabeticSessionExists(requestBody.sessionData.sessionId))
  ) {
    const newExpirationDate: Date = createExpirationDate();
    touchMonoalphabeticSession(requestBody.sessionData.sessionId, newExpirationDate);

    if ((await getRemainingHints(requestBody.sessionData.sessionId)) > 0) {
      consumeHint(requestBody.sessionData.sessionId);
      const correctEncryptionMapping: LetterMapping = await getEncryptionMapping(
        requestBody.sessionData.sessionId,
      );
      const responseBody: HintResponse = {
        correctLetter: findCorrectLetterFromMapping(
          requestBody.requestedLetter,
          correctEncryptionMapping,
        ),
        sessionData: {
          expirationDate: newExpirationDate,
        },
      };
      const childLogger = logger.child({
        sessionId: requestBody.sessionData.sessionId,
        expirationDate: newExpirationDate,
      });
      childLogger.trace(
        "Successfully processed hint request and renewed MonoalphabeticSession expiration date.",
      );
      res.json(responseBody);
    }
  } else {
    const responseBody: HintResponse = { correctLetter: "" };
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    childLogger.warn("Unrecognized MonoalphabeticSession in hint request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;
