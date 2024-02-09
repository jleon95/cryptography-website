import { LetterMapping, ValidatedLetterMapping } from '../logic.models';

export function validateLetterMapping(letterMappingUnderReview: LetterMapping, correctLetterMapping: LetterMapping): ValidatedLetterMapping {

  const validatedMapping: ValidatedLetterMapping = {};

  for (const letter in letterMappingUnderReview)
    validatedMapping[letter] = letterMappingUnderReview[letter].toUpperCase() === correctLetterMapping[letter] ? true : false;

  return validatedMapping;
}