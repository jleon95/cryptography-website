import { useGameSessionStore } from './gameSessionStore';
import { CellState, useDecipherGridDOMStatesStore } from './decipherGridDOMStatesStore';
import { useTextStore } from './textStore';
import { callAPI, Action } from '../../composables/Monoalphabetic/apiCalls';
import type { HintRequest, HintResponse } from '../../composables/Monoalphabetic/apiCalls';

function chooseLetterForHint(letterFrequencies: { [letter: string]: number }, cellEditableStatus: { [letter: string]: boolean }) {

  let sum: number = 0;
  const candidateLetters: Array<string> = [];
  const probabilityIntervals: Array<number> = [];

  for (const letter in letterFrequencies) {
    if (letterFrequencies[letter] > 0 && cellEditableStatus[letter]) {
      candidateLetters.push(letter);
      probabilityIntervals.push(sum + Math.round(letterFrequencies[letter] * 100));
      sum += Math.round(letterFrequencies[letter] * 100);
    }
  }

  if (sum) {
    const chosenIntervalPoint = Math.random() * sum;
    for (let i = 0; i < candidateLetters.length; i++)
      if (chosenIntervalPoint <= probabilityIntervals[i])
        return candidateLetters[i];
  }

  return "";
}

async function sendHintRequest(chosenLetter: string, sessionId: string) {

  const hintRequestBody: HintRequest = {
    requestedLetter: chosenLetter,
    sessionData: {
      sessionId: sessionId
    }
  };
  return (await callAPI(Action.REQUEST_HINT, hintRequestBody) as HintResponse).correctLetter;
}

export async function requestHint() {

  const gameSessionStore = useGameSessionStore();

  // Guard against requesting the same letter twice when clicking very fast because the state hasn't been updated yet at that point.
  if (!gameSessionStore.hintManagement.requestingHint) {

    gameSessionStore.hintManagement.requestingHint = true;

    if (gameSessionStore.hintsLeft()) {

      const textStore = useTextStore();
      const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
      const chosenLetter: string = chooseLetterForHint(textStore.letterFrequencies, decipherGridDOMStatesStore.cellEditableStatus)

      if (chosenLetter) { // Don't request hints (even if you still have) if there are no letters left to decrypt

        gameSessionStore.useHint();
        const correctLetter: string = await sendHintRequest(chosenLetter, textStore.sessionId);

        if (correctLetter) {
          textStore.assignedLetters[chosenLetter] = correctLetter.toLowerCase();
          decipherGridDOMStatesStore.updateCellState(chosenLetter, CellState.HINT);
          gameSessionStore.hintManagement.requestingHint = false;
        }
        else // If the server responds with an empty sessionId, the new text request was rejected.
          textStore.resetSessionId();
      }
    }
  }
}