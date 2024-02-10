import { LetterMapping } from '../logic.models';
export function findCorrectLetterFromMapping(requestedLetter: string, letterMapping: LetterMapping): string {

  for (const letter in letterMapping)
    if (letterMapping[letter] === requestedLetter)
      return letter;
}