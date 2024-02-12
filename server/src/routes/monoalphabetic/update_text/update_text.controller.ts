import { Request, Response, Router } from 'express';
import { checkMonoalphabeticSessionExists, touchMonoalphabeticSession, getOriginalTextAndMappingFromMonoalphabeticSession } from './update_text.service';
import { reCreateEncryptedText } from './update_text.logic';
import { createExpirationDate } from '../utils';
import type { UpdateTextRequest, UpdateTextResponse } from '../controller.models';
import type { EncryptedTextInfo } from '../logic.models';
const logger = require('../../../../logger');
const router = Router();

router.post('/update_text', async (req: Request, res: Response) => {

  const requestBody: UpdateTextRequest = req.body;
  const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });

  if (typeof requestBody.sessionData.sessionId === "string" && await checkMonoalphabeticSessionExists(requestBody.sessionData.sessionId)) {

    touchMonoalphabeticSession(requestBody.sessionData.sessionId, createExpirationDate());
    const encryptedTextInfo: EncryptedTextInfo = await getOriginalTextAndMappingFromMonoalphabeticSession(requestBody.sessionData.sessionId);
    const responseBody: UpdateTextResponse = {
      encryptedText: await reCreateEncryptedText(encryptedTextInfo, requestBody.difficultyOptions)
    };
    childLogger.trace("Received and processed text update request");
    res.json(responseBody);
  }
  else {
    const responseBody: UpdateTextResponse = { encryptedText: "" };
    childLogger.warn("Unrecognized MonoalphabeticSession in text update request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;