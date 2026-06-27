import { LetterMapping, ValidatedLetterMapping } from '../logic.models';

export function validateLetterMapping(letterMappingUnderReview: LetterMapping, correctLetterMapping: LetterMapping): ValidatedLetterMapping {

  const validatedMapping: ValidatedLetterMapping = {};

  for (const letter in letterMappingUnderReview)
    // Non-null assertion because it will have been validated before this function is called.
    validatedMapping[letter] = letterMappingUnderReview[letter]!.toUpperCase() === correctLetterMapping[letter] ? true : false;

  return validatedMapping;
}