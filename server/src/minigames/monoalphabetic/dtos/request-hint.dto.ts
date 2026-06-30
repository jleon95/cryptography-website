import { type as arkType } from "arktype";

export const HintRequest = arkType({
  requestedLetter: "string.alpha == 1",
  sessionData: {
    sessionId: "string.uuid",
  },
});

export type HintRequest = typeof HintRequest.infer;


export const HintResponse = arkType({
  correctLetter: "string.alpha == 1",
  "sessionData?": {
    expirationDate: "Date",
  },
});

export type HintResponse = typeof HintResponse.infer;