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

  if (sessionStore.isSessionExpired())
    sessionStore.$reset();

  const options: NewTextRequest = {
    difficultyOptions: sessionStore.activeTextSettings,
    sessionData: {
      sessionId: sessionStore.sessionId
    }
  };
  const response: NewTextResponse = await callAPI(Action.NEW_TEXT, options) as NewTextResponse;
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  decipherGridDOMStatesStore.$reset();
  const gameProgressStore = useGameProgressStore();
  gameProgressStore.$reset();
  const textStore = useTextStore();
  textStore.$reset();

  if ("sessionData" in response) {

    sessionStore.sessionId = response.sessionData!.sessionId;
    sessionStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
    textStore.encryptedText = response.encryptedText;
    gameProgressStore.usedTextSettings = { ...options.difficultyOptions }; // Know which settings were active from the start of the game session.
    gameProgressStore.sessionDuration.start = (new Date).getTime();
  }
  else // If the server responds with empty sessionData, the new text request was rejected.
    sessionStore.$reset();
}