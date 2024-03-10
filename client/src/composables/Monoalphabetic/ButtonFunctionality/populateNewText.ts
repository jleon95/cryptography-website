import { useGameProgressStore } from '../Stores/gameProgressStore';
import { useSessionStore } from '../Stores/sessionStore';
import { useTextStore } from '../Stores/textStore';
import { useDecipherGridDOMStatesStore } from '../Stores/decipherGridDOMStatesStore';
import { callAPI, Action } from '../apiCalls';
import { closeSessionExpiredPopup, isSessionExpiredPopupDeployed } from '../deploySessionExpiredPopup';
import type { NewTextRequest, NewTextResponse } from '../apiCalls';
import { resetAnimationsOfElement } from '../utils';

export function isSessionExpired() {
  const sessionStore = useSessionStore(); // If put outside it'll run immediately, and thus before the global pinia store has been created.
  return sessionStore.isSessionExpired();
}

function displayNewText(newText: string, activeDifficultyOptions: { keepSpaces: boolean, keepPunctuation: boolean }) {
  const encryptedTextarea: HTMLElement = document.getElementById("encrypted-textarea")!;
  const decryptedTextarea: HTMLElement = document.getElementById("decrypted-textarea")!;
  resetAnimationsOfElement(encryptedTextarea, "reveal-text", "reveal-text");
  resetAnimationsOfElement(decryptedTextarea, "reveal-text", "reveal-text");
  setTimeout(() => { // Just when the text area is fully collapsed.
    const textStore = useTextStore();
    textStore.$reset();
    textStore.encryptedText = newText;
    const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
    decipherGridDOMStatesStore.$reset();
  }, 1500);
  setTimeout(() => {
    resetAnimationsOfElement(encryptedTextarea, "reveal-text");
    resetAnimationsOfElement(decryptedTextarea, "reveal-text");
    const gameProgressStore = useGameProgressStore();
    gameProgressStore.$reset();
    gameProgressStore.usedTextSettings = { ...activeDifficultyOptions }; // Know which settings were active from the start of the game session.
    gameProgressStore.sessionDuration.start = (new Date).getTime();
    const sessionStore = useSessionStore();
    sessionStore.loadingNewText = false;
  }, 3000);
}

export async function populateNewText() {

  const sessionStore = useSessionStore();

  if (sessionStore.isSessionExpired())
    sessionStore.$reset();

  sessionStore.loadingNewText = true;

  if (isSessionExpiredPopupDeployed())
    closeSessionExpiredPopup();

  const options: NewTextRequest = {
    difficultyOptions: sessionStore.activeTextSettings,
    sessionData: {
      sessionId: sessionStore.sessionId
    }
  };
  const response: NewTextResponse = await callAPI(Action.NEW_TEXT, options) as NewTextResponse;

  if ("sessionData" in response) {

    sessionStore.sessionId = response.sessionData!.sessionId;
    sessionStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
    sessionStore.startSessionExpirationTimer();
    displayNewText(response.encryptedText, options.difficultyOptions);
  }
  else { // If the server responds with empty sessionData, the new text request was rejected.
    const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
    decipherGridDOMStatesStore.$reset();
    const gameProgressStore = useGameProgressStore();
    gameProgressStore.$reset();
    const textStore = useTextStore();
    textStore.$reset();
    sessionStore.$reset();
  }
}