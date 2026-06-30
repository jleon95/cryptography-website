import { type as arkType } from "arktype";

// Compound response to DB query for random text
export const ChosenOriginalTextInfo = arkType({
  text: "string > 0",
  id: "number"
});

export type ChosenOriginalTextInfo = typeof ChosenOriginalTextInfo.infer;