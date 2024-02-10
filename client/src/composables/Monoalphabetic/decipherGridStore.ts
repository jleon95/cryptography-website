import { defineStore } from 'pinia';
import { reactive } from 'vue';

export enum CellState {
  CORRECT = "correct",
  WRONG = "wrong",
  HINT = "hint",
  DISABLED = "disabled",
  DEFAULT = ""
}

const defaultState = {
  contentCellStyles: {
    correct: false,
    wrong: false,
    hint: false,
    disabled: false
  },
  cellEditableStatus: true
};

interface CellStyleClasses {
  correct: boolean,
  wrong: boolean,
  hint: boolean,
  disabled: boolean
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
        contentCellStyleClasses[letter].hint = false;
        contentCellStyleClasses[letter].disabled = false;
        break;
      }
      case CellState.WRONG: {
        contentCellStyleClasses[letter].correct = false;
        contentCellStyleClasses[letter].wrong = true;
        contentCellStyleClasses[letter].hint = false;
        contentCellStyleClasses[letter].disabled = false;
        break;
      }
      case CellState.HINT: {
        contentCellStyleClasses[letter].correct = false;
        contentCellStyleClasses[letter].wrong = false;
        contentCellStyleClasses[letter].hint = true;
        contentCellStyleClasses[letter].disabled = false;
        break;
      }
      case CellState.DISABLED: {
        contentCellStyleClasses[letter].correct = false;
        contentCellStyleClasses[letter].wrong = false;
        contentCellStyleClasses[letter].hint = false;
        contentCellStyleClasses[letter].disabled = true;
        break;
      }
      case CellState.DEFAULT: {
        contentCellStyleClasses[letter].correct = false;
        contentCellStyleClasses[letter].wrong = false;
        contentCellStyleClasses[letter].hint = false;
        contentCellStyleClasses[letter].disabled = false;
        break;
      }
    }
  }

  function disableInputInCell(letter: string) {
    cellEditableStatus[letter] = false;
  }

  function $reset() {
    for (const letter in contentCellStyleClasses) {
      contentCellStyleClasses[letter] = { correct: false, wrong: false, hint: false, disabled: false };
      cellEditableStatus[letter] = defaultState.cellEditableStatus;
    }
  }

  return { contentCellStyleClasses, cellEditableStatus, updateCellState, disableInputInCell, $reset };
});