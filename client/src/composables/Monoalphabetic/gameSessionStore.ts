import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useDecipherGridDOMStatesStore } from './decipherGridDOMStatesStore';

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
  totalLetters: 27, // In Spanish
  validationCounter: 0
}

export const useGameSessionStore = defineStore('gameSession', () => {
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const textDifficultySettings = reactive({ ...defaultValues.textDifficultySettings })
  const hintManagement = reactive({ ...defaultValues.hintManagement })
  const validationCounter = ref(defaultValues.validationCounter);
  const lettersConfirmed = computed(() => {
    let sum: number = 0;
    for (const letter in decipherGridDOMStatesStore.cellEditableStatus)
      sum += +!decipherGridDOMStatesStore.cellEditableStatus[letter]; // Non-editable letter means "completed letter" in practice.

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

  function incrementValidationCounter() {
    validationCounter.value++;
  }

  function resetValidationCounter() {
    validationCounter.value = defaultValues.validationCounter;
  }

  return { textDifficultySettings, hintManagement, lettersConfirmed, validationCounter, useHint, hintsLeft, resetHints, incrementValidationCounter, resetValidationCounter };
})