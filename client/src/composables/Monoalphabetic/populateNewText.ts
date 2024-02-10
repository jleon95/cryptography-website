import { useGameDifficultyStore } from './gameDifficultyStore';
import { useTextStore } from './textStore';
import { useDecipherGridStore } from './decipherGridStore';
import { callAPI, Action } from './apiCalls';
import type { NewTextRequest, NewTextResponse } from './apiCalls';

export function isSessionExpired() {
  const textStore = useTextStore(); // If put outside it'll run immediately, and thus before the global pinia store has been created.
  return textStore.isSessionExpired();
}

export async function populateNewText() {
  const gameDifficultyStore = useGameDifficultyStore();
  const textStore = useTextStore();
  const decipherGridStore = useDecipherGridStore();
  const options: NewTextRequest = {
    difficultyOptions: {
      keepSpaces: gameDifficultyStore.keepSpaces,
      keepPunctuation: gameDifficultyStore.keepPunctuation
    },
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
    gameDifficultyStore.resetHints();
  }
  else // If the server responds with an empty sessionId, the new text request was rejected.
    textStore.resetSessionId();
}