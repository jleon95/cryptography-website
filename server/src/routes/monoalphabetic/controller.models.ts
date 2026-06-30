import { type as arkType } from "arktype";
import { LetterMapping, ValidatedLetterMapping } from "./service.models.js";

// --- NewText: Request / Response ---
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


// --- UpdateText: Request / Response ---
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

// --- RevealText: Request / Response ---
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


// --- Validation: Request / Response ---
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


// --- Hint: Request / Response ---
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
