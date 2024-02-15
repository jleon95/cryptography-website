import { useGameSessionStore } from '../Stores/gameSessionStore';
import { CellState, useDecipherGridDOMStatesStore } from '../Stores/decipherGridDOMStatesStore';
import { useTextStore } from '../Stores/textStore';
import { deployEndGameScreen } from '../deployEndgamePopup';
import { callAPI, Action } from '../apiCalls';
import type { HintRequest, HintResponse } from '../apiCalls';

function areThereLettersLeftToSolve(cellEditableStatus: { [letter: string]: boolean }) {
  for (const letter in cellEditableStatus)
    if (cellEditableStatus[letter])
      return true;

  return false;
}

function chooseLetterForHint(letterFrequencies: { [letter: string]: number }, cellEditableStatus: { [letter: string]: boolean }) {

  let sum: number = 0;
  const candidateLetters: Array<string> = [];
  const probabilityIntervals: Array<number> = [];

  for (const letter in letterFrequencies) {
    if (cellEditableStatus[letter]) {
      candidateLetters.push(letter);
      sum += Math.round(letterFrequencies[letter] * 100);
      probabilityIntervals.push(sum);
    }
  }

  const chosenIntervalPoint = Math.random() * sum;
  for (let i = 0; i < candidateLetters.length; i++)
    if (chosenIntervalPoint <= probabilityIntervals[i])
      return candidateLetters[i];
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
  if (gameSessionStore.hintManagement.requestingHint)
    return;

  gameSessionStore.hintManagement.requestingHint = true;
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();

  // Don't request hints (even if you still have) if there are no letters left to decrypt
  if (gameSessionStore.hintsLeft() && areThereLettersLeftToSolve(decipherGridDOMStatesStore.cellEditableStatus)) {

    const textStore = useTextStore();
    const chosenLetter: string = chooseLetterForHint(textStore.letterFrequencies, decipherGridDOMStatesStore.cellEditableStatus)!
    const correctLetter: string = await sendHintRequest(chosenLetter, textStore.sessionId);

    if (correctLetter) {
      gameSessionStore.hintManagement.usedHints++;
      textStore.assignedLetters[chosenLetter] = correctLetter.toLowerCase();
      decipherGridDOMStatesStore.updateCellState(chosenLetter, CellState.HINT);

      if (gameSessionStore.isDecryptionSolved()) {
        gameSessionStore.sessionTiming.finish = (new Date).getTime();
        setTimeout(() => deployEndGameScreen(), 1000);
      }
    }
    else // If the server responds with an empty sessionId, the new text request was rejected.
      textStore.resetSessionId();
  }
  gameSessionStore.hintManagement.requestingHint = false;
}