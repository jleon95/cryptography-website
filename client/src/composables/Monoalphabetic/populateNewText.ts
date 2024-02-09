import { useGameDifficultyStore } from './gameDifficultyStore';
import { useTextStore, letters } from './textStore';
import { callAPI, Action } from './apiCalls';
import type { NewTextRequestOptions, NewTextResponse } from './apiCalls';

export function isSessionExpired() {
  const textStore = useTextStore(); // If put outside it'll run immediately, and thus before the global pinia store has been created.
  return textStore.isSessionExpired();
}

export async function populateNewText() {
  const gameDifficultyStore = useGameDifficultyStore();
  const textStore = useTextStore();
  const options: NewTextRequestOptions = {
    difficultyOptions: {
      keepSpaces: gameDifficultyStore.keepSpaces,
      keepPunctuation: gameDifficultyStore.keepPunctuation
    },
    sessionData: {
      sessionId: textStore.getSessionId()
    }
  };
  const response: NewTextResponse = await callAPI(Action.NEW_TEXT, options);
  if (textStore.isSessionExpired())
    textStore.sessionId = response.sessionData.sessionId!;
  textStore.encryptedText = response.encryptedText;
  textStore.resetDecryption();
  textStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
}