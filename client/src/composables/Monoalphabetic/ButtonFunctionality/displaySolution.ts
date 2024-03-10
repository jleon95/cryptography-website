import { useSessionStore } from '../Stores/sessionStore';
import { useGameProgressStore } from '../Stores/gameProgressStore';
import { useTextStore } from '../Stores/textStore';
import { useDecipherGridDOMStatesStore, CellState } from '../Stores/decipherGridDOMStatesStore';
import { callAPI, Action } from '../apiCalls';
import type { RevealTextRequest, RevealTextResponse } from '../apiCalls';
import { resetAnimationsOfElement } from '../utils';

function displaySolutionInTextarea(solution: string) {
  const decryptedTextarea: HTMLElement = document.getElementById("decrypted-textarea")!;
  resetAnimationsOfElement(decryptedTextarea, "reveal-text", "reveal-text");
  setTimeout(() => {
    const textStore = useTextStore();
    textStore.originalText = solution;
  }, 1500);
  setTimeout(() => {
    resetAnimationsOfElement(decryptedTextarea, "reveal-text");
    const sessionStore = useSessionStore();
    sessionStore.loadingSolution = false;
  }, 3000);
}

export async function displaySolution() {

  const sessionStore = useSessionStore();

  if (sessionStore.isSessionExpired())
    return;

  const gameProgressStore = useGameProgressStore();

  if (!gameProgressStore.isSolutionRevealed) {

    sessionStore.loadingSolution = true;
    const revealTextRequestBody: RevealTextRequest = {
      sessionData: {
        sessionId: sessionStore.sessionId
      }
    };
    const response: RevealTextResponse = await callAPI(Action.REVEAL_TEXT, revealTextRequestBody) as RevealTextResponse;

    if ("sessionData" in response) {
      gameProgressStore.isSolutionRevealed = true;
      displaySolutionInTextarea(response.originalText);
      const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
      for (const letter in decipherGridDOMStatesStore.contentCellStyleClasses)
        if (!decipherGridDOMStatesStore.contentCellStyleClasses[letter].correct && !decipherGridDOMStatesStore.contentCellStyleClasses[letter].hint)
          decipherGridDOMStatesStore.updateCellState(letter, CellState.DISABLED);
    }
    else
      sessionStore.$reset();
  }
}