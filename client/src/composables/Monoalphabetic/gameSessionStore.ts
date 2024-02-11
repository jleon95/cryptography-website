import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import { useDecipherGridStore } from './decipherGridStore';

const defaultValues = {
  textDifficultySettings: {
    keepSpaces: false,
    keepPunctuation: false,
  },
  hintManagement: {
    allowedHints: 3,
    usedHints: 0,
    requestingHint: false
  },
  totalLetters: 27 // In Spanish
}

export const useGameSessionStore = defineStore('gameSession', () => {
  const decipherGridStore = useDecipherGridStore();
  const textDifficultySettings = reactive({ ...defaultValues.textDifficultySettings })
  const hintManagement = reactive({ ...defaultValues.hintManagement })
  const lettersConfirmed = computed(() => {
    let sum: number = 0;
    for (const letter in decipherGridStore.cellEditableStatus)
      sum += +!decipherGridStore.cellEditableStatus[letter];

    return sum;
  });

  function useHint() {
    if (hintManagement.usedHints < hintManagement.allowedHints)
      hintManagement.usedHints++;
  }

  function hintsLeft() {
    return hintManagement.allowedHints - hintManagement.usedHints;
  }

  function resetHints() {
    hintManagement.usedHints = defaultValues.hintManagement.usedHints;
    hintManagement.requestingHint = defaultValues.hintManagement.requestingHint;
  }


  return { textDifficultySettings, hintManagement, lettersConfirmed, useHint, hintsLeft, resetHints };
})