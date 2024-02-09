import { useTextStore } from '../../composables/Monoalphabetic/textStore';
import { useDecipherGridStore, CellState } from '../../composables/Monoalphabetic/decipherGridStore';
import { callAPI, Action } from '../../composables/Monoalphabetic/apiCalls';
import type { ValidationRequest, ValidationResponse } from '../../composables/Monoalphabetic/apiCalls';

export async function validateDecryption() {

  const textStore = useTextStore();
  const decipherGridStore = useDecipherGridStore();
  const lettersToValidate: { [original: string]: string } = {};
  // Be careful!! Mapping in backend is {real: encrypted}, but mapping in frontend is {encrypted: real}.
  for (const letter in textStore.assignedLetters)
    if (textStore.assignedLetters[letter])
      lettersToValidate[textStore.assignedLetters[letter].toUpperCase()] = letter;

  const validationRequestBody: ValidationRequest = {
    sessionData: {
      sessionId: textStore.getSessionId()
    },
    letterMapping: lettersToValidate
  };
  const response: ValidationResponse = await callAPI(Action.VALIDATION, validationRequestBody) as ValidationResponse;

  // Also reverse the mapping here.
  for (const letter in response.validatedLetterMapping) {
    if (response.validatedLetterMapping[letter]) {
      decipherGridStore.updateCellState(lettersToValidate[letter], CellState.CORRECT);
    }
    else
      decipherGridStore.updateCellState(lettersToValidate[letter], CellState.WRONG);
  }
}