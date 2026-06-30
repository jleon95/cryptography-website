import { type as arkType } from "arktype";
import { LetterMapping, ValidatedLetterMapping } from "./logic.dto.js";

export const ValidationRequest = arkType({
  sessionData: {
    sessionId: "string.uuid",
  },
  letterMapping: LetterMapping,
});

export type ValidationRequest = typeof ValidationRequest.infer;


export const ValidationResponse = arkType({
  validatedLetterMapping: ValidatedLetterMapping,
  "sessionData?": {
    expirationDate: "Date",
  },
});

export type ValidationResponse = typeof ValidationResponse.infer;
