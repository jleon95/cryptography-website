import { useSessionStore } from '../Stores/sessionStore';
import { CellState, useDecipherGridDOMStatesStore } from '../Stores/decipherGridDOMStatesStore';
import { useTextStore } from '../Stores/textStore';
import { deployEndGameScreen } from '../deployEndgamePopup';
import { callAPI, Action } from '../apiCalls';
import type { HintRequest, HintResponse } from '../apiCalls';
import { useGameProgressStore } from '../Stores/gameProgressStore';

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
  return await callAPI(Action.REQUEST_HINT, hintRequestBody) as HintResponse;
}

export async function requestHint() {

  const sessionStore = useSessionStore();

  if (sessionStore.isSessionExpired())
    return;

  // Guard against clicking faster than the state is updated.
  if (sessionStore.requestingHint)
    return;

  sessionStore.requestingHint = true;
  const gameProgressStore = useGameProgressStore();
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();

  // Don't request hints (even if you still have) if there are no letters left to decrypt
  if (gameProgressStore.hintsLeft() && areThereLettersLeftToSolve(decipherGridDOMStatesStore.cellEditableStatus)) {

    const textStore = useTextStore();
    
    const chosenLetter: string = chooseLetterForHint(textStore.letterFrequencies, decipherGridDOMStatesStore.cellEditableStatus)!
    const response: HintResponse = await sendHintRequest(chosenLetter, sessionStore.sessionId);

    if ("sessionData" in response) {
      sessionStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
      gameProgressStore.hintManagement.usedHints++;
      textStore.assignedLetters[chosenLetter] = response.correctLetter.toLowerCase();
      decipherGridDOMStatesStore.updateCellState(chosenLetter, CellState.HINT);

      if (gameProgressStore.isDecryptionSolved()) {
        gameProgressStore.sessionDuration.finish = (new Date).getTime();
        setTimeout(() => deployEndGameScreen(), 1000);
      }
    }
    else // If the server responds with empty sessionData, the hint request was rejected.
      sessionStore.$reset();
  }
  sessionStore.requestingHint = false;
}