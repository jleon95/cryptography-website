import { Request, Response, Router } from 'express';
import { insertSession, touchSession, insertTextToBeDecrypted, checkSessionExists } from './new_text.service';
import { createNewEncryptedText } from './new_text.logic';
import { chooseNewText } from './new_text.service';
import type { EncryptedTextInfo } from './new_text.logic';
import type { ChosenTextInfo } from './new_text.service';
const logger = require('../../../../logger');
const cookie = require("cookie");
const crypto = require("crypto");

const router = Router();

function createSessionCookie() {
  const sessionId = crypto.randomUUID();
  const options = {
    sameSite: 'Strict',
    path: '/monoalphabetic',
    httpOnly: false,
    maxAge: +process.env["SESSION_DURATION"]
  };
  return {sessionId, options}
}

router.post('/new_text', async (req: Request, res: Response) => {

  let chosenTextInfo: ChosenTextInfo = await chooseNewText();
  let encryptedTextInfo: EncryptedTextInfo = await createNewEncryptedText(chosenTextInfo.text, req.body);

  if (req.cookies["session"] === undefined) {
    let newSessionCookie = createSessionCookie();
    res.setHeader('Set-Cookie', cookie.serialize("session", newSessionCookie.sessionId, newSessionCookie.options));
    insertSession(newSessionCookie.sessionId, newSessionCookie.options.maxAge, {});
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, newSessionCookie.sessionId, false);
    res.json({ encryptedText: encryptedTextInfo.text });
    logger.trace(`Creating new encrypted text for new session ID ${newSessionCookie.sessionId}.`);
  }
  else if (await checkSessionExists(req.cookies["session"])) {
    touchSession(req.cookies["session"], +process.env["SESSION_DURATION"]);
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, req.cookies["session"], true);
    res.json({ encryptedText: encryptedTextInfo.text });
    logger.trace(`Creating new encrypted text for existing session ID ${req.cookies["session"]}.`);
  }
  else {
    res.json({ encryptedText: "" });
    logger.warn(`Unrecognized session ID ${req.cookies["session"]} in API request for creation of new encrypted text, sending empty text instead.`);
  }
});

export default router;