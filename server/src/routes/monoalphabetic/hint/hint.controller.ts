import { Request, Response, Router } from 'express';
import { getEncryptionMapping, checkMonoalphabeticSessionExists, touchMonoalphabeticSession } from './hint.service';
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

    touchMonoalphabeticSession(requestBody.sessionData.sessionId, createExpirationDate());
    const correctEncryptionMapping: LetterMapping = await getEncryptionMapping(requestBody.sessionData.sessionId);
    const responseBody: HintResponse = {
      correctLetter: findCorrectLetterFromMapping(requestBody.requestedLetter, correctEncryptionMapping)
    };
    res.json(responseBody);
  }
  else {
    const responseBody: HintResponse = { correctLetter: "" };
    childLogger.warn("Unrecognized MonoalphabeticSession in validation request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;