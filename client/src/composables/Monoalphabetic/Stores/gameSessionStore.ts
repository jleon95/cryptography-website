import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useDecipherGridDOMStatesStore } from './decipherGridDOMStatesStore';

const defaultValues = {
  textSettings: {
    current: {
      keepSpaces: false,
      keepPunctuation: false
    },
    used: {
      keepSpaces: false,
      keepPunctuation: false
    }
  },
  hintManagement: {
    allowedHints: 3,
    usedHints: 0,
    requestingHint: false
  },
  totalLetters: 27, // In Spanish
  validationCounter: 0,
  sessionTiming: {
    start: 0,
    finish: 1
  },
}

export const useGameSessionStore = defineStore('gameSession', () => {
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const textSettings = reactive({
    current: { ...defaultValues.textSettings.current },
    used: { ...defaultValues.textSettings.used }
  });
  const hintManagement = reactive({ ...defaultValues.hintManagement });
  const validationCounter = ref(defaultValues.validationCounter);
  const sessionTiming = reactive({ ...defaultValues.sessionTiming });
  const lettersConfirmed = computed(() => {
    let sum: number = 0;
    for (const letter in decipherGridDOMStatesStore.cellEditableStatus)
      sum += +!decipherGridDOMStatesStore.cellEditableStatus[letter]; // Non-editable letter means "completed letter" in practice.

    return sum;
  });

  function getPrintableSessionDuration() {
    const minutes = Math.floor((sessionTiming.finish - sessionTiming.start) / 60000);
    const seconds = Math.floor(((sessionTiming.finish - sessionTiming.start) % 60000) / 1000);
    return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  }

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

  function isDecryptionSolved() {
    return lettersConfirmed.value == defaultValues.totalLetters;
  }

  watch(() => textSettings.current.keepSpaces, (keepSpaces) => {
    textSettings.used.keepSpaces = textSettings.used.keepSpaces || keepSpaces;
  });

  watch(() => textSettings.current.keepPunctuation, (keepPunctuation) => {
    textSettings.used.keepPunctuation = textSettings.used.keepPunctuation || keepPunctuation;
  });

  return {
    textSettings, hintManagement, lettersConfirmed, validationCounter, sessionTiming, getPrintableSessionDuration,
    useHint, hintsLeft, resetHints, incrementValidationCounter, resetValidationCounter, isDecryptionSolved
  };
})