import { type as arkType } from "arktype";

export const UpdateTextRequest = arkType({
  difficultyOptions: {
    keepSpaces: "boolean",
    keepPunctuation: "boolean",
  },
  sessionData: {
    sessionId: "string.uuid",
  },
});

export type UpdateTextRequest = typeof UpdateTextRequest.infer;


export const UpdateTextResponse = arkType({
  encryptedText: "string.alpha > 0",
  "sessionData?": {
    expirationDate: "Date",
  },
});

export type UpdateTextResponse = typeof UpdateTextResponse.infer;