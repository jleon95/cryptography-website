import { Request, Response, Router } from 'express';
import { checkActiveMonoalphabeticSessionExists, touchMonoalphabeticSession, getOriginalTextAndMappingFromMonoalphabeticSession } from './update_text.service';
import { reCreateEncryptedText } from './update_text.logic';
import { createExpirationDate } from '../utils';
import type { UpdateTextRequest, UpdateTextResponse } from '../controller.models';
import type { EncryptedTextInfo } from '../logic.models';
const logger = require('../../../../logger');
const router = Router();

router.post('/update_text', async (req: Request, res: Response) => {

  const requestBody: UpdateTextRequest = req.body;
  
  if (typeof requestBody.sessionData.sessionId === "string" && await checkActiveMonoalphabeticSessionExists(requestBody.sessionData.sessionId)) {

    const newExpirationDate: Date = createExpirationDate();
    touchMonoalphabeticSession(requestBody.sessionData.sessionId, newExpirationDate);
    const encryptedTextInfo: EncryptedTextInfo = await getOriginalTextAndMappingFromMonoalphabeticSession(requestBody.sessionData.sessionId);
    const responseBody: UpdateTextResponse = {
      encryptedText: await reCreateEncryptedText(encryptedTextInfo, requestBody.difficultyOptions),
      sessionData: {
        expirationDate: newExpirationDate
      }
    };
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId, expirationDate: newExpirationDate });
    childLogger.trace("Successfully processed text update request and renewed MonoalphabeticSession expiration date.");
    res.json(responseBody);
  }
  else {
    const responseBody: UpdateTextResponse = { encryptedText: "" };
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    childLogger.warn("Unrecognized MonoalphabeticSession in text update request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;