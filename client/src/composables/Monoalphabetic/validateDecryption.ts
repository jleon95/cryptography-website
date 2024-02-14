import { useTextStore } from '../../composables/Monoalphabetic/textStore';
import { useGameSessionStore } from '../../composables/Monoalphabetic/gameSessionStore';
import { useDecipherGridDOMStatesStore, CellState } from './decipherGridDOMStatesStore';
import { callAPI, Action } from '../../composables/Monoalphabetic/apiCalls';
import { deployEndGameScreen } from './EndgamePopup/deployEndgamePopup';
import type { ValidationRequest, ValidationResponse } from '../../composables/Monoalphabetic/apiCalls';

export async function validateDecryption() {

  const textStore = useTextStore();
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const lettersToValidate: { [original: string]: string } = {};
  // Be careful!! Mapping in backend is {real: encrypted}, but mapping in frontend is {encrypted: real}.
  for (const letter in textStore.assignedLetters)
    if (decipherGridDOMStatesStore.cellEditableStatus[letter] && textStore.assignedLetters[letter])
      lettersToValidate[textStore.assignedLetters[letter].toUpperCase()] = letter;

  if (Object.keys(lettersToValidate).length) {

    const validationRequestBody: ValidationRequest = {
      sessionData: {
        sessionId: textStore.getSessionId()
      },
      letterMapping: lettersToValidate
    };
    const response: ValidationResponse = await callAPI(Action.VALIDATION, validationRequestBody) as ValidationResponse;

    if (Object.keys(response.validatedLetterMapping).length) {

      // Reverse the letter mapping here too.
      for (const letter in response.validatedLetterMapping) {
        if (response.validatedLetterMapping[letter])
          decipherGridDOMStatesStore.updateCellState(lettersToValidate[letter], CellState.CORRECT);
        else
          decipherGridDOMStatesStore.updateCellState(lettersToValidate[letter], CellState.WRONG);
      }
      const gameSessionStore = useGameSessionStore();
      gameSessionStore.incrementValidationCounter();

      if (gameSessionStore.isDecryptionSolved()) {
        gameSessionStore.sessionTiming.finish = (new Date).getTime();
        setTimeout(() => deployEndGameScreen(), 1000);
      }
    }
    else // If the server responds with an empty sessionId, the new text request was rejected.
      textStore.resetSessionId();
  }
}