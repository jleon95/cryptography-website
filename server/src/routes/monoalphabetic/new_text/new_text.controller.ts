import { Request, Response, Router } from 'express';
import { insertSession, touchSession, insertTextToBeDecrypted, checkSessionExists } from './new_text.service';
import { createNewEncryptedText } from './new_text.logic';
import { chooseNewText } from './new_text.service';
import type { EncryptedTextInfo } from '../logic.models';
import type { ChosenOriginalTextInfo } from '../service.models';
import type { NewTextResponse } from '../controller.models'
const logger = require('../../../../logger');
const crypto = require("crypto");
const router = Router();

function createExpirationDate(): Date {
  return new Date((new Date().getTime()) + +process.env["SESSION_DURATION"]);
}

function createSession() {
  const sessionId: string = crypto.randomUUID();
  const expirationDate: Date = createExpirationDate();
  return { sessionId, expirationDate };
}

router.post('/new_text', async (req: Request, res: Response) => {

  let chosenTextInfo: ChosenOriginalTextInfo = await chooseNewText();
  let encryptedTextInfo: EncryptedTextInfo = await createNewEncryptedText(chosenTextInfo.text, req.body.difficultyOptions);

  if (req.body.sessionData.sessionId === "") {
    let newSession = createSession();
    const childLogger = logger.child({ sessionId: newSession.sessionId });
    childLogger.trace("Creating new encrypted text for new session ID.");
    await insertSession(newSession.sessionId, newSession.expirationDate, {});
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, newSession.sessionId, false);
    let responseBody: NewTextResponse = {
      sessionData: newSession,
      encryptedText: encryptedTextInfo.text
    };
    res.json(responseBody);
  }
  else if (typeof req.body.sessionData.sessionId === "string" && await checkSessionExists(req.body.sessionData.sessionId)) {
    let newExpirationDate: Date = createExpirationDate();
    const childLogger = logger.child({ sessionId: req.body.sessionData.sessionId });
    childLogger.trace("Creating new encrypted text for existing session ID.");
    touchSession(req.body.sessionData.sessionId, newExpirationDate);
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, req.body.sessionData.sessionId, true);
    let responseBody: NewTextResponse = {
      sessionData: {
        expirationDate: newExpirationDate
      },
      encryptedText: encryptedTextInfo.text
    };
    res.json(responseBody);
  }
  else {
    const childLogger = logger.child({ sessionId: req.body.sessionData.sessionId });
    childLogger.warn("Unrecognized session ID in API request for creation of new encrypted text, sending error 400 instead.");
    res.status(400).send("Unrecognized session ID");
  }
});

export default router;