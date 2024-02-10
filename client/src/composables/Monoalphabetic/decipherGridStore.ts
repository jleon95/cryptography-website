import { defineStore } from 'pinia';
import { reactive } from 'vue';

export enum CellState {
  CORRECT = "correct",
  WRONG = "wrong",
  DEFAULT = ""
}

const defaultState = {
  contentCellStyles: {
    correct: false,
    wrong: false
  },
  cellEditableStatus: true
};

interface CellStyleClasses {
  correct: boolean,
    wrong: boolean
}

const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

export const useDecipherGridStore = defineStore("decipherGrid", () => {

  const contentCellStyleClasses: { [letter: string]: CellStyleClasses } = reactive(letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: { ...defaultState.contentCellStyles } }), {}));
  const cellEditableStatus: { [letter: string]: boolean } = reactive(letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: defaultState.cellEditableStatus }), {}));

  function updateCellState(letter: string, newState: CellState): void {

    switch (newState) {
      case CellState.CORRECT: {
        contentCellStyleClasses[letter].correct = true;
        contentCellStyleClasses[letter].wrong = false;
        break;
      }
      case CellState.WRONG: {
        contentCellStyleClasses[letter].correct = false;
        contentCellStyleClasses[letter].wrong = true;
        break;
      }
      case CellState.DEFAULT: {
        contentCellStyleClasses[letter].correct = false;
        contentCellStyleClasses[letter].wrong = false;
        break;
      }
    }
  }

  function disableInputInCell(letter: string) {
    cellEditableStatus[letter] = false;
  }

  return { contentCellStyleClasses, cellEditableStatus, updateCellState, disableInputInCell };
});