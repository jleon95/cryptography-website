import { type as arkType } from "arktype";

export const NewTextRequest = arkType({
  difficultyOptions: {
    keepSpaces: "boolean",
    keepPunctuation: "boolean",
  },
  sessionData: {
    sessionId: "string.uuid",
  },
});

export type NewTextRequest = typeof NewTextRequest.infer;


export const NewTextResponse = arkType({ 
  encryptedText: "string.alpha > 0",
  "sessionData?": {
    sessionId: "string.uuid",
    expirationDate: "Date",
  },
});

export type NewTextResponse = typeof NewTextResponse.infer;