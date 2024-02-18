import { Request, Response, Router } from 'express';
import { checkMonoalphabeticSessionExists, getOriginalText } from './reveal_text.service';
import type { RevealTextRequest, RevealTextResponse } from '../controller.models';
const logger = require('../../../../logger');
const router = Router();

router.post('/reveal_text', async (req: Request, res: Response) => {

  const requestBody: RevealTextRequest = req.body;
  const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });

  if (typeof requestBody.sessionData.sessionId === "string" && await checkMonoalphabeticSessionExists(requestBody.sessionData.sessionId)) {

    const originalText: string = await getOriginalText(requestBody.sessionData.sessionId);
    const responseBody: RevealTextResponse = {
      originalText: originalText,
      sessionData: {}
    };
    childLogger.trace("Received and processed text reveal request");
    res.json(responseBody);
  }
  else {
    const responseBody: RevealTextResponse = { originalText: "" };
    childLogger.warn("Unrecognized MonoalphabeticSession in text reveal request, sending empty response.");
    res.status(400).json(responseBody);
  }
});

export default router;