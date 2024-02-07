import { Request, Response, Router } from 'express';
import { insertSession, insertTextToBeDecrypted } from './new_text.service';
import { createNewEncryptedText } from './new_text.logic';
import { chooseNewText } from './new_text.service';
import type { EncryptedTextInfo } from './new_text.logic';
import type { ChosenTextInfo } from './new_text.service';
const cookie = require("cookie");
const crypto = require("crypto");

const router = Router();

router.post('/new_text', async (req: Request, res: Response) => {

  let chosenTextInfo: ChosenTextInfo = await chooseNewText();
  let encryptedTextInfo: EncryptedTextInfo = await createNewEncryptedText(chosenTextInfo.text, req.body);

  if (req.cookies["session"] === undefined) {
    let newSessionCookie = { sessionId: crypto.randomUUID(), httpOnly: false, maxAge: 60 * 60 * 2 } // 2 hours
    res.setHeader('Set-Cookie', cookie.serialize("session", newSessionCookie.sessionId, {
      httpOnly: newSessionCookie.httpOnly,
      maxAge: newSessionCookie.maxAge
    }));
    insertSession(newSessionCookie.sessionId, newSessionCookie.maxAge, {});
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, newSessionCookie.sessionId, false);
  }
  else {
    insertTextToBeDecrypted(encryptedTextInfo.letterMapping, chosenTextInfo.id, req.cookies["session"], true);
  }
  res.json({ encryptedText: encryptedTextInfo.text });
});

export default router;