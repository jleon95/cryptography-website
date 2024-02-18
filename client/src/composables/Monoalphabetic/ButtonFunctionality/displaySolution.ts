import { useSessionStore } from '../Stores/sessionStore';
import { useGameProgressStore } from '../Stores/gameProgressStore';
import { useTextStore } from '../Stores/textStore';
import { callAPI, Action } from '../apiCalls';
import type { RevealTextRequest, RevealTextResponse } from '../apiCalls';

export async function displaySolution() {

  const gameProgressStore = useGameProgressStore();

  if (!gameProgressStore.isSolutionRevealed) {

    const sessionStore = useSessionStore();
    const revealTextRequestBody: RevealTextRequest = {
      sessionData: {
        sessionId: sessionStore.sessionId
      }
    };
    const originalText: string = (await callAPI(Action.REVEAL_TEXT, revealTextRequestBody) as RevealTextResponse).originalText;
    const textStore = useTextStore();
    textStore.originalText = originalText;

    gameProgressStore.isSolutionRevealed = true;
  }
}