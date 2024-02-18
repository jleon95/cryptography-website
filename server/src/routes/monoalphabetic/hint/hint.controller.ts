import { Request, Response, Router } from 'express';
import { getEncryptionMapping, checkMonoalphabeticSessionExists, touchMonoalphabeticSession, getRemainingHints, consumeHint } from './hint.service';
import { findCorrectLetterFromMapping } from './hint.logic';
import { createExpirationDate } from '../utils';
import type { HintRequest, HintResponse } from '../controller.models';
import type { LetterMapping } from '../logic.models';
const logger = require('../../../../logger');

const router = Router();

router.post('/hint', async (req: Request, res: Response) => {

  const requestBody: HintRequest = req.body;
  const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });

  if (typeof requestBody.sessionData.sessionId === "string" && await checkMonoalphabeticSessionExists(requestBody.sessionData.sessionId)) {

    const newExpirationDate: Date = createExpirationDate();
    touchMonoalphabeticSession(requestBody.sessionData.sessionId, newExpirationDate);
    if ((await getRemainingHints(requestBody.sessionData.sessionId)) > 0) {
      consumeHint(requestBody.sessionData.sessionId);
      const correctEncryptionMapping: LetterMapping = await getEncryptionMapping(requestBody.sessionData.sessionId);
      const responseBody: HintResponse = {
        correctLetter: findCorrectLetterFromMapping(requestBody.requestedLetter, correctEncryptionMapping),
        sessionData: {
          expirationDate: newExpirationDate
        }
      };
      res.json(responseBody);
    }
  }
  else {
    const responseBody: HintResponse = { correctLetter: "" };
    childLogger.warn("Unrecognized MonoalphabeticSession in hint request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;