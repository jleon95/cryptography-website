import { Request, Response, Router } from 'express';
import { getEncryptionMapping, checkMonoalphabeticSessionExists, touchMonoalphabeticSession } from './validation.service';
import { validateLetterMapping } from './validation.logic';
import { createExpirationDate } from '../utils';
import type { LetterMapping, ValidatedLetterMapping } from '../logic.models';
import type { ValidationRequest, ValidationResponse } from '../controller.models';
const logger = require('../../../../logger');

const router = Router();

router.post('/validation', async (req: Request, res: Response) => {

  const requestBody: ValidationRequest = req.body;
  const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });

  if (typeof requestBody.sessionData.sessionId === "string" && await checkMonoalphabeticSessionExists(requestBody.sessionData.sessionId)) {

    touchMonoalphabeticSession(requestBody.sessionData.sessionId, createExpirationDate());
    const correctEncryptionMapping: LetterMapping = await getEncryptionMapping(requestBody.sessionData.sessionId);
    const responseBody: ValidationResponse = {
      validatedLetterMapping: validateLetterMapping(requestBody.letterMapping, correctEncryptionMapping) as ValidatedLetterMapping
    };
    res.json(responseBody);
  }
  else {
    const responseBody: ValidationResponse = { validatedLetterMapping: {} };
    childLogger.warn("Unrecognized MonoalphabeticSession in validation request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;