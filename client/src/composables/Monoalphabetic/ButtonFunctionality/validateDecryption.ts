import { useSessionStore } from '../Stores/sessionStore';
import { useTextStore } from '../Stores/textStore';
import { useGameProgressStore } from '../Stores/gameProgressStore';
import { useDecipherGridDOMStatesStore, CellState } from '../Stores/decipherGridDOMStatesStore';
import { deployEndGameScreen } from '../deployEndgamePopup';
import { callAPI, Action } from '../apiCalls';
import type { ValidationRequest, ValidationResponse } from '../apiCalls';

export async function validateDecryption() {

  const sessionStore = useSessionStore();

  if (sessionStore.isSessionExpired())
    return;

  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const lettersToValidate: { [original: string]: string } = {};
  // Be careful!! Mapping in backend is {real: encrypted}, but mapping in frontend is {encrypted: real}.
  const textStore = useTextStore();
  for (const letter in textStore.assignedLetters)
    if (decipherGridDOMStatesStore.cellEditableStatus[letter] && textStore.assignedLetters[letter])
      lettersToValidate[textStore.assignedLetters[letter].toUpperCase()] = letter;

  if (Object.keys(lettersToValidate).length) {

    const validationRequestBody: ValidationRequest = {
      sessionData: {
        sessionId: sessionStore.sessionId
      },
      letterMapping: lettersToValidate
    };
    const response: ValidationResponse = await callAPI(Action.VALIDATION, validationRequestBody) as ValidationResponse;

    if ("sessionData" in response) {

      sessionStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
      sessionStore.startSessionExpirationTimer();

      // Reverse the letter mapping here too.
      for (const letter in response.validatedLetterMapping) {
        if (response.validatedLetterMapping[letter])
          decipherGridDOMStatesStore.updateCellState(lettersToValidate[letter], CellState.CORRECT);
        else
          decipherGridDOMStatesStore.updateCellState(lettersToValidate[letter], CellState.WRONG);
      }
      const gameProgressStore = useGameProgressStore();
      gameProgressStore.validationCounter++;

      if (gameProgressStore.isDecryptionSolved()) {
        gameProgressStore.sessionDuration.finish = (new Date).getTime();
        setTimeout(() => deployEndGameScreen(), 1000);
      }
    }
    else // If the server responds with empty sessionData, the validation request was rejected.
      sessionStore.$reset();
  }
}