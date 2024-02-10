import { useGameDifficultyStore } from './gameDifficultyStore';
import { CellState, useDecipherGridStore } from './decipherGridStore';
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

async function makeHintRequest(chosenLetter: string, sessionId: string) {

  const hintRequestBody: HintRequest = {
    requestedLetter: chosenLetter,
    sessionData: {
      sessionId: sessionId
    }
  };
  return (await callAPI(Action.REQUEST_HINT, hintRequestBody) as HintResponse).correctLetter;
}

export async function requestHint() {

  const gameDifficultyStore = useGameDifficultyStore();

  // Guard against requesting the same letter twice when clicking very fast because the state hasn't been updated yet at that point.
  if (!gameDifficultyStore.requestingHint) {

    gameDifficultyStore.requestingHint = true;

    if (gameDifficultyStore.hintsLeft()) {

      const textStore = useTextStore();
      const decipherGridStore = useDecipherGridStore();
      const chosenLetter: string = chooseLetterForHint(textStore.letterFrequencies, decipherGridStore.cellEditableStatus)

      if (chosenLetter) {

        gameDifficultyStore.useHint();
        const correctLetter: string = await makeHintRequest(chosenLetter, textStore.sessionId);
        textStore.assignedLetters[chosenLetter] = correctLetter.toLowerCase();
        decipherGridStore.updateCellState(chosenLetter, CellState.HINT);
        gameDifficultyStore.requestingHint = false;
      }
    }
  }
}