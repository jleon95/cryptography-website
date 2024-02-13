import { useGameSessionStore } from './gameSessionStore';
import { useTextStore } from './textStore';
import { useDecipherGridDOMStatesStore } from './decipherGridDOMStatesStore';
import { callAPI, Action } from './apiCalls';
import type { NewTextRequest, NewTextResponse } from './apiCalls';

export function isSessionExpired() {
  const textStore = useTextStore(); // If put outside it'll run immediately, and thus before the global pinia store has been created.
  return textStore.isSessionExpired();
}

export async function populateNewText() {
  const gameSessionStore = useGameSessionStore();
  const textStore = useTextStore();
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const options: NewTextRequest = {
    difficultyOptions: gameSessionStore.textDifficultySettings,
    sessionData: {
      sessionId: textStore.getSessionId()
    }
  };
  const response: NewTextResponse = await callAPI(Action.NEW_TEXT, options) as NewTextResponse;

  if (response.sessionData.sessionId) {
    textStore.sessionId = response.sessionData.sessionId;
    textStore.encryptedText = response.encryptedText;
    textStore.resetDecryption();
    textStore.setExpirationDate(new Date(response.sessionData.expirationDate!));
    gameSessionStore.textDifficultySettingsUsed = { ...options.difficultyOptions }; // Know which settings were active from the start of the game session.
  }
  else // If the server responds with an empty sessionId, the new text request was rejected.
    textStore.resetSessionId();
  decipherGridDOMStatesStore.$reset();
  gameSessionStore.resetHints();
  gameSessionStore.resetValidationCounter();
}