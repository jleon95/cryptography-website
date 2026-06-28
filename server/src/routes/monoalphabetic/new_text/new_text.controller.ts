import crypto from "node:crypto";
import { type Request, type Response, Router } from "express";
import logger from "../../../../logger.js";
import { env as validEnv } from "../../../env.js";
import type { NewTextRequest, NewTextResponse } from "../controller.models.js";
import type { EncryptedTextInfo } from "../logic.models.js";
import type { ChosenOriginalTextInfo } from "../service.models.js";
import { createExpirationDate } from "../utils.js";
import { createNewEncryptedText } from "./new_text.logic.js";
import {
  checkActiveMonoalphabeticSessionExists,
  chooseNewText,
  deleteMonoalphabeticSession,
  insertMonoalphabeticSession,
} from "./new_text.service.js";

const router = Router();

async function createNewMonoalphabeticSession(requestBody: NewTextRequest) {
  const chosenTextInfo: ChosenOriginalTextInfo = await chooseNewText();
  const encryptedTextInfo: EncryptedTextInfo = await createNewEncryptedText(
    chosenTextInfo.text,
    requestBody.difficultyOptions,
  );
  const newSession = { sessionId: crypto.randomUUID(), expirationDate: createExpirationDate() };
  await insertMonoalphabeticSession(
    newSession.sessionId,
    newSession.expirationDate,
    encryptedTextInfo.letterMapping,
    chosenTextInfo.id,
    validEnv.MAX_HINTS,
  );
  const responseBody: NewTextResponse = {
    sessionData: newSession,
    encryptedText: encryptedTextInfo.text,
  };
  const childLogger = logger.child({
    sessionId: newSession.sessionId,
    expirationDate: newSession.expirationDate,
  });
  childLogger.trace("Successfully created new MonoalphabeticSession.");
  return responseBody;
}

router.post("/new_text", async (req: Request, res: Response) => {
  const requestBody: NewTextRequest = req.body;

  if (requestBody.sessionData.sessionId === "") {
    res.json(await createNewMonoalphabeticSession(requestBody));
  } else if (
    typeof requestBody.sessionData.sessionId === "string" &&
    (await checkActiveMonoalphabeticSessionExists(requestBody.sessionData.sessionId))
  ) {
    deleteMonoalphabeticSession(requestBody.sessionData.sessionId);
    res.json(await createNewMonoalphabeticSession(requestBody));
  } else {
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    const responseBody: NewTextResponse = { encryptedText: "" };
    childLogger.warn(
      "Unrecognized non-empty MonoalphabeticSession in request for new MonoalphabeticSession, sending empty response.",
    );
    res.status(400).json(responseBody);
  }
});

export default router;
