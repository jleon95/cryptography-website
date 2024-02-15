import { useGameProgressStore } from '../Stores/gameProgressStore';
import { useSessionStore } from '../Stores/sessionStore';
import { useTextStore } from '../Stores/textStore';
import { useDecipherGridDOMStatesStore } from '../Stores/decipherGridDOMStatesStore';
import { callAPI, Action } from '../apiCalls';
import type { NewTextRequest, NewTextResponse } from '../apiCalls';

export function isSessionExpired() {
  const sessionStore = useSessionStore(); // If put outside it'll run immediately, and thus before the global pinia store has been created.
  return sessionStore.isSessionExpired();
}

export async function populateNewText() {
  const sessionStore = useSessionStore();
  const textStore = useTextStore();
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const gameProgressStore = useGameProgressStore();
  const options: NewTextRequest = {
    difficultyOptions: sessionStore.activeTextSettings,
    sessionData: {
      sessionId: sessionStore.getSessionIdCheckedForExpiration()
    }
  };
  const response: NewTextResponse = await callAPI(Action.NEW_TEXT, options) as NewTextResponse;
  decipherGridDOMStatesStore.$reset();
  gameProgressStore.$reset();

  if (response.sessionData.sessionId) {
    
    sessionStore.sessionId = response.sessionData.sessionId;
    textStore.$reset();
    textStore.encryptedText = response.encryptedText;
    sessionStore.setExpirationDate(new Date(response.sessionData.expirationDate!));
    gameProgressStore.usedTextSettings = { ...options.difficultyOptions }; // Know which settings were active from the start of the game session.
    gameProgressStore.sessionDuration.start = (new Date).getTime();
  }
  else // If the server responds with an empty sessionId, the new text request was rejected.
    sessionStore.$reset();
}