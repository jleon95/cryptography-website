import { Request, Response, Router } from 'express';
import { insertSession, touchSession, insertTextToBeDecrypted, checkSessionExists } from './new_text.service';
import { createNewEncryptedText } from './new_text.logic';
import { chooseNewText } from './new_text.service';
import type { EncryptedTextInfo } from '../logic.models';
import type { ChosenOriginalTextInfo } from '../service.models';
import type { NewTextRequest, NewTextResponse } from '../controller.models'
const logger = require('../../../../logger');
const crypto = require("crypto");
const router = Router();

function createExpirationDate(): Date {
  return new Date((new Date().getTime()) + +process.env["SESSION_DURATION"]);
}

function createSession() {
  return { sessionId: crypto.randomUUID(), expirationDate: createExpirationDate() };
}

router.post('/new_text', async (req: Request, res: Response) => {

  const requestBody: NewTextRequest = req.body;
  const chosenTextInfo: ChosenOriginalTextInfo = await chooseNewText();
  const encryptedTextInfo: EncryptedTextInfo = await createNewEncryptedText(chosenTextInfo.text, requestBody.difficultyOptions);

  if (requestBody.sessionData.sessionId === "") {
    const newSession = createSession();
    const childLogger = logger.child({ sessionId: newSession.sessionId });
    childLogger.trace("Creating new encrypted text for new session ID.");
    await insertSession(newSession.sessionId, newSession.expirationDate, {});
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, newSession.sessionId, false);
    const responseBody: NewTextResponse = {
      sessionData: newSession,
      encryptedText: encryptedTextInfo.text
    };
    res.json(responseBody);
  }
  else if (typeof requestBody.sessionData.sessionId === "string" && await checkSessionExists(requestBody.sessionData.sessionId)) {
    const newExpirationDate: Date = createExpirationDate();
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    childLogger.trace("Creating new encrypted text for existing session ID.");
    touchSession(requestBody.sessionData.sessionId, newExpirationDate);
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, requestBody.sessionData.sessionId, true);
    const responseBody: NewTextResponse = {
      sessionData: {
        expirationDate: newExpirationDate
      },
      encryptedText: encryptedTextInfo.text
    };
    res.json(responseBody);
  }
  else {
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    childLogger.warn("Unrecognized session ID in API request for creation of new encrypted text, sending error 400 instead.");
    res.status(400).send("Unrecognized session ID");
  }
});

export default router;