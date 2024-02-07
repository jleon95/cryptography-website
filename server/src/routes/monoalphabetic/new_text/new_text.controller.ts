import { Request, Response, Router } from 'express';
import { insertSession, insertTextToBeDecrypted, checkSessionExists } from './new_text.service';
import { createNewEncryptedText } from './new_text.logic';
import { chooseNewText } from './new_text.service';
import type { EncryptedTextInfo } from './new_text.logic';
import type { ChosenTextInfo } from './new_text.service';
import { warn } from 'console';
const cookie = require("cookie");
const crypto = require("crypto");

const router = Router();

function createSessionCookie() {
  const sessionId = crypto.randomUUID();
  const options = {
    sameSite: 'Strict',
    path: '/monoalphabetic',
    httpOnly: false,
    maxAge: 60 * 60 * 2 * 1000 // 2 hours in milliseconds
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
    res.json({ info: "OK", encryptedText: encryptedTextInfo.text });
  }
  else if (await checkSessionExists(req.cookies["session"])) {
    await insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, req.cookies["session"], true);
    res.json({ info: "OK", encryptedText: encryptedTextInfo.text });
  }
  else {
    console.log(`Error: Unrecognized session ID: ${req.cookies["session"]}`);
    res.json({ info: "Unrecognized session ID", encryptedText: "" });
  }
});

export default router;