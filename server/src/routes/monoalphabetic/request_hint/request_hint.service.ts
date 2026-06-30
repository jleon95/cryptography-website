import type { LetterMapping } from "../service.models.js";
export function findCorrectLetterFromMapping(
  requestedLetter: string,
  letterMapping: LetterMapping,
): string {
  for (const letter in letterMapping) {
    if (letterMapping[letter] === requestedLetter) {
      return letter;
    }
  }

  throw new Error(`No mapping found for requested letter ${requestedLetter}`);
}
