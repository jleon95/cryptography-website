import { Request, Response, Router, response } from 'express';
import { insertMonoalphabeticSession, checkMonoalphabeticSessionExists, deleteMonoalphabeticSession } from './new_text.service';
import { createNewEncryptedText } from './new_text.logic';
import { chooseNewText } from './new_text.service';
import type { EncryptedTextInfo } from '../logic.models';
import type { ChosenOriginalTextInfo } from '../service.models';
import type { NewTextRequest, NewTextResponse } from '../controller.models';
const logger = require('../../../../logger');
const crypto = require("crypto");
const router = Router();

function createExpirationDate(): Date {
  return new Date((new Date().getTime()) + +process.env["SESSION_DURATION"]);
}

async function createNewMonoalphabeticSession(requestBody: NewTextRequest) {
  const chosenTextInfo: ChosenOriginalTextInfo = await chooseNewText();
  const encryptedTextInfo: EncryptedTextInfo = await createNewEncryptedText(chosenTextInfo.text, requestBody.difficultyOptions);
  const newSession = { sessionId: crypto.randomUUID(), expirationDate: createExpirationDate() };
  const childLogger = logger.child({ sessionId: newSession.sessionId, expirationDate: newSession.expirationDate });
  childLogger.trace("Creating new MonoalphabeticSession.");
  await insertMonoalphabeticSession(newSession.sessionId, newSession.expirationDate, encryptedTextInfo.letterMapping, chosenTextInfo.id, +process.env["MAX_HINTS"]);
  const responseBody: NewTextResponse = {
    sessionData: newSession,
    encryptedText: encryptedTextInfo.text
  };
  return responseBody;
}

router.post('/new_text', async (req: Request, res: Response) => {

  const requestBody: NewTextRequest = req.body;
  
  if (requestBody.sessionData.sessionId === "") {
    res.json(await createNewMonoalphabeticSession(requestBody));
  }
  else if (typeof requestBody.sessionData.sessionId === "string" && await checkMonoalphabeticSessionExists(requestBody.sessionData.sessionId)) {
    deleteMonoalphabeticSession(requestBody.sessionData.sessionId);
    res.json(await createNewMonoalphabeticSession(requestBody));
  }
  else {
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    const responseBody: NewTextResponse = { sessionData: { sessionId: "" }, encryptedText: "" };
    childLogger.warn("Unrecognized non-empty MonoalphabeticSession in request for new MonoalphabeticSession, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;