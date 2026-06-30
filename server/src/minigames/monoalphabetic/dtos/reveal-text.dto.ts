import { type as arkType } from "arktype";

export const RevealTextRequest = arkType({
  sessionData: {
    sessionId: "string.uuid",
  },
});

export type RevealTextRequest = typeof RevealTextRequest.infer;


export const RevealTextResponse = arkType({
  originalText: "string > 0"
});

export type RevealTextResponse = typeof RevealTextResponse.infer;