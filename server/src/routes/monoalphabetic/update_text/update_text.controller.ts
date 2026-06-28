import { type Request, type Response, Router } from "express";
import logger from "../../../../logger.js";
import type { UpdateTextRequest, UpdateTextResponse } from "../controller.models.js";
import type { EncryptedTextInfo } from "../logic.models.js";
import { createExpirationDate } from "../utils.js";
import { reCreateEncryptedText } from "./update_text.logic.js";
import {
  checkActiveMonoalphabeticSessionExists,
  getOriginalTextAndMappingFromMonoalphabeticSession,
  touchMonoalphabeticSession,
} from "./update_text.service.js";

const router = Router();

router.post("/update_text", async (req: Request, res: Response) => {
  const requestBody: UpdateTextRequest = req.body;

  if (
    typeof requestBody.sessionData.sessionId === "string" &&
    (await checkActiveMonoalphabeticSessionExists(requestBody.sessionData.sessionId))
  ) {
    const newExpirationDate: Date = createExpirationDate();
    touchMonoalphabeticSession(requestBody.sessionData.sessionId, newExpirationDate);
    const encryptedTextInfo: EncryptedTextInfo =
      await getOriginalTextAndMappingFromMonoalphabeticSession(requestBody.sessionData.sessionId);
    const responseBody: UpdateTextResponse = {
      encryptedText: await reCreateEncryptedText(encryptedTextInfo, requestBody.difficultyOptions),
      sessionData: {
        expirationDate: newExpirationDate,
      },
    };
    const childLogger = logger.child({
      sessionId: requestBody.sessionData.sessionId,
      expirationDate: newExpirationDate,
    });
    childLogger.trace(
      "Successfully processed text update request and renewed MonoalphabeticSession expiration date.",
    );
    res.json(responseBody);
  } else {
    const responseBody: UpdateTextResponse = { encryptedText: "" };
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    childLogger.warn(
      "Unrecognized MonoalphabeticSession in text update request, sending empty response.",
    );
    res.status(400).json(responseBody);
  }
});

export default router;
