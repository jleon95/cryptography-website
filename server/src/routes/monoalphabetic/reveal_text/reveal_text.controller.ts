import { type Request, type Response, Router } from "express";
import logger from "../../../../logger.js";
import type { RevealTextRequest, RevealTextResponse } from "../controller.models.js";
import { checkActiveMonoalphabeticSessionExists, getOriginalText } from "./reveal_text.repository.js";

const router = Router();

router.post("/reveal_text", async (req: Request, res: Response) => {
  const requestBody: RevealTextRequest = req.body;
  const childLogger = logger.child({ sessionId: requestBody.sessionData.sessionId });

  if (
    typeof requestBody.sessionData.sessionId === "string" &&
    (await checkActiveMonoalphabeticSessionExists(requestBody.sessionData.sessionId))
  ) {
    const originalText: string = await getOriginalText(requestBody.sessionData.sessionId);
    const responseBody: RevealTextResponse = {
      originalText: originalText,
      sessionData: {},
    };
    childLogger.trace("Successfully processed text reveal request.");
    res.json(responseBody);
  } else {
    const responseBody: RevealTextResponse = { originalText: "" };
    childLogger.warn(
      "Unrecognized MonoalphabeticSession in text reveal request, sending empty response.",
    );
    res.status(400).json(responseBody);
  }
});

export default router;
