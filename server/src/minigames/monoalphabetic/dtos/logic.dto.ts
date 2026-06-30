import { type as arkType } from "arktype";

// Exactly 27 keys corresponding to the 27 letters in the Spanish alphabet
export const LetterMapping = arkType("Record<string == 1, string == 1>").filter((data, ctx) => {
  const keyCount = Object.keys(data).length;
  if(keyCount !== 27) {
    ctx.reject(`a dictionary with exactly 27 keys (received ${keyCount})`);
  }
  return true;
});

export type LetterMapping = typeof LetterMapping.infer;


// For each letter sent to validation, true/false depending on whether the user was right
export const ValidatedLetterMapping = arkType("Record<string == 1, boolean>").filter((data, ctx) => {
  const keyCount = Object.keys(data).length;
  if(keyCount === 0 || keyCount > 27) {
    ctx.reject(`a non-empty dictionary with at most 27 keys (received ${keyCount})`);
  }
  return true;
});

export type ValidatedLetterMapping = typeof ValidatedLetterMapping.infer;