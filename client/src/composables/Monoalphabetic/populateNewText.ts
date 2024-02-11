import { useGameSessionStore } from './gameSessionStore';
import { useTextStore } from './textStore';
import { useDecipherGridStore } from './decipherGridStore';
import { callAPI, Action } from './apiCalls';
import type { NewTextRequest, NewTextResponse } from './apiCalls';

export function isSessionExpired() {
  const textStore = useTextStore(); // If put outside it'll run immediately, and thus before the global pinia store has been created.
  return textStore.isSessionExpired();
}

export async function populateNewText() {
  const gameSessionStore = useGameSessionStore();
  const textStore = useTextStore();
  const decipherGridStore = useDecipherGridStore();
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
    decipherGridStore.$reset();
    gameSessionStore.resetHints();
  }
  else // If the server responds with an empty sessionId, the new text request was rejected.
    textStore.resetSessionId();
}