import { defineStore } from 'pinia';
import { ref } from 'vue';

const defaultValues = {
  keepSpaces: false,
  keepPunctuation: false,
  allowedHints: 3,
  usedHints: 0,
  requestingHint: false
}

export const useGameDifficultyStore = defineStore('gameDifficulty', () => {
  const keepSpaces = ref(defaultValues.keepSpaces);
  const keepPunctuation = ref(defaultValues.keepPunctuation);
  const allowedHints = ref(defaultValues.allowedHints);
  const usedHints = ref(defaultValues.usedHints);
  const requestingHint = ref(defaultValues.requestingHint);

  function enableSpaces() {
    keepSpaces.value = true;
  }

  function disableSpaces() {
    keepSpaces.value = false;
  }

  function enablePunctuation() {
    keepPunctuation.value = true;
  }

  function disablePunctuation() {
    keepPunctuation.value = false;
  }

  function useHint() {
    if (usedHints.value < allowedHints.value)
      usedHints.value++;
  }

  function hintsLeft() {
    return allowedHints.value - usedHints.value;
  }

  function resetHints() {
    usedHints.value = defaultValues.usedHints;
    requestingHint.value = defaultValues.requestingHint;
  }

  return { keepSpaces, keepPunctuation, requestingHint, enableSpaces, disableSpaces, enablePunctuation, disablePunctuation, useHint, hintsLeft, resetHints };
})