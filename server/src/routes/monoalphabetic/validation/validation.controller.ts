import { Request, Response, Router } from 'express';
import { getEncryptionMapping } from './validation.service';
import { validateLetterMapping } from './validation.logic';
import type { LetterMapping, ValidatedLetterMapping } from '../logic.models';
import type { ValidationRequest, ValidationResponse } from '../controller.models'

const router = Router();

router.post('/validation', async (req: Request, res: Response) => {

  const requestBody: ValidationRequest = req.body;
  const correctEncryptionMapping: LetterMapping = await getEncryptionMapping(requestBody.sessionData.sessionId);
  const responseBody: ValidationResponse = {
    validatedLetterMapping: validateLetterMapping(requestBody.letterMapping, correctEncryptionMapping)
  };
  res.json(responseBody);
});

export default router;