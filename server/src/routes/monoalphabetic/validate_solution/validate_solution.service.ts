import type { LetterMapping, ValidatedLetterMapping } from "../service.models.js";

export function validateLetterMapping(
  letterMappingUnderReview: LetterMapping,
  correctLetterMapping: LetterMapping,
): ValidatedLetterMapping {
  const validatedMapping: ValidatedLetterMapping = {};

  // Non-null assertion because it will have been validated before this function is called.
  for (const letter in letterMappingUnderReview)
    validatedMapping[letter] =
      letterMappingUnderReview[letter]!.toUpperCase() === correctLetterMapping[letter];

  return validatedMapping;
}
