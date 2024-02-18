import { useSessionStore } from '../Stores/sessionStore';
import { useGameProgressStore } from '../Stores/gameProgressStore';
import { useTextStore } from '../Stores/textStore';
import { useDecipherGridDOMStatesStore, CellState } from '../Stores/decipherGridDOMStatesStore';
import { callAPI, Action } from '../apiCalls';
import type { RevealTextRequest, RevealTextResponse } from '../apiCalls';

export async function displaySolution() {

  const sessionStore = useSessionStore();

  if (sessionStore.isSessionExpired())
    return;

  const gameProgressStore = useGameProgressStore();

  if (!gameProgressStore.isSolutionRevealed) {

    
    const revealTextRequestBody: RevealTextRequest = {
      sessionData: {
        sessionId: sessionStore.sessionId
      }
    };
    const response: RevealTextResponse = await callAPI(Action.REVEAL_TEXT, revealTextRequestBody) as RevealTextResponse;

    if ("sessionData" in response) {
      const textStore = useTextStore();
      textStore.originalText = response.originalText;
      gameProgressStore.isSolutionRevealed = true;
      const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
      for (const letter in decipherGridDOMStatesStore.contentCellStyleClasses)
        if (!decipherGridDOMStatesStore.contentCellStyleClasses[letter].correct && !decipherGridDOMStatesStore.contentCellStyleClasses[letter].hint)
          decipherGridDOMStatesStore.updateCellState(letter, CellState.DISABLED);
    }
    else
      sessionStore.$reset();
  }
}