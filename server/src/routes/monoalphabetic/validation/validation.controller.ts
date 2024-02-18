import { Request, Response, Router } from 'express';
import { getEncryptionMapping, checkActiveMonoalphabeticSessionExists, touchMonoalphabeticSession } from './validation.service';
import { validateLetterMapping } from './validation.logic';
import { createExpirationDate } from '../utils';
import type { LetterMapping, ValidatedLetterMapping } from '../logic.models';
import type { ValidationRequest, ValidationResponse } from '../controller.models';
const logger = require('../../../../logger');

const router = Router();

router.post('/validation', async (req: Request, res: Response) => {

  const requestBody: ValidationRequest = req.body;

  if (typeof requestBody.sessionData.sessionId === "string" && await checkActiveMonoalphabeticSessionExists(requestBody.sessionData.sessionId)) {

    const newExpirationDate: Date = createExpirationDate();
    touchMonoalphabeticSession(requestBody.sessionData.sessionId, newExpirationDate);
    const correctEncryptionMapping: LetterMapping = await getEncryptionMapping(requestBody.sessionData.sessionId);
    const responseBody: ValidationResponse = {
      validatedLetterMapping: validateLetterMapping(requestBody.letterMapping, correctEncryptionMapping) as ValidatedLetterMapping,
      sessionData: {
        expirationDate: newExpirationDate
      }
    };
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId, expirationDate: newExpirationDate });
    childLogger.trace("Successfully processed validation request and renewed MonoalphabeticSession expiration date.");
    res.json(responseBody);
  }
  else {
    const responseBody: ValidationResponse = { validatedLetterMapping: {} };
    const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });
    childLogger.warn("Unrecognized MonoalphabeticSession in validation request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;