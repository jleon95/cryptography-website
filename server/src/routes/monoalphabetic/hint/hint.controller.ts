import { Request, Response, Router } from 'express';
import { getEncryptionMapping } from './hint.service';
import { findCorrectLetterFromMapping } from './hint.logic';
import type { HintRequest, HintResponse } from '../controller.models';
import type { LetterMapping } from '../logic.models';

const router = Router();

router.post('/hint', async (req: Request, res: Response) => {

  const requestBody: HintRequest = req.body;
  const correctEncryptionMapping: LetterMapping = await getEncryptionMapping(requestBody.sessionData.sessionId);
  const responseBody: HintResponse = {
    correctLetter: findCorrectLetterFromMapping(requestBody.requestedLetter, correctEncryptionMapping)
  };
  res.json(responseBody);
});

export default router;