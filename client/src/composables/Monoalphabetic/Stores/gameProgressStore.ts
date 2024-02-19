import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useDecipherGridDOMStatesStore } from './decipherGridDOMStatesStore';
import { useSessionStore } from './sessionStore';

const defaultValues = {
  usedTextSettings: {
    keepSpaces: false,
    keepPunctuation: false
  },
  hintManagement: {
    allowedHints: +import.meta.env.VITE_MAX_HINTS,
    usedHints: 0,
  },
  totalLetters: 27, // In Spanish
  validationCounter: 0,
  sessionDuration: {
    start: 0,
    finish: 1
  },
  isSolutionRevealed: false
}

export const useGameProgressStore = defineStore("gameProgress", () => {
  const locallyStoredData = localStorage.getItem("gameProgress") ? JSON.parse(localStorage.getItem("gameProgress")!) : null;
  const sessionStore = useSessionStore();
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const isSolutionRevealed = locallyStoredData ? ref(locallyStoredData["isSolutionRevealed"]) : ref(defaultValues.isSolutionRevealed);
  const usedTextSettings = locallyStoredData ? reactive({ ...locallyStoredData["usedTextSettings"] }) : reactive({ ...defaultValues.usedTextSettings });
  const hintManagement = locallyStoredData ? reactive({ ...locallyStoredData["hintManagement"] }) : reactive({ ...defaultValues.hintManagement });
  const validationCounter = locallyStoredData ? ref(locallyStoredData["validationCounter"]) : ref(defaultValues.validationCounter);
  const sessionDuration = locallyStoredData ? reactive({ ...locallyStoredData["sessionDuration"] }) : reactive({ ...defaultValues.sessionDuration });
  const lettersConfirmed = computed(() => {
    let sum: number = 0;
    for (const letter in decipherGridDOMStatesStore.cellEditableStatus)
      sum += +!decipherGridDOMStatesStore.cellEditableStatus[letter]; // Non-editable letter means "completed letter" in practice.

    return sum;
  });

  function getPrintableSessionDuration() {
    const minutes = Math.floor((sessionDuration.finish - sessionDuration.start) / 60000);
    const seconds = Math.floor(((sessionDuration.finish - sessionDuration.start) % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function hintsLeft() {
    return hintManagement.allowedHints - hintManagement.usedHints;
  }

  function isDecryptionSolved() {
    return lettersConfirmed.value == defaultValues.totalLetters;
  }

  function $reset() {
    hintManagement.usedHints = defaultValues.hintManagement.usedHints;
    validationCounter.value = defaultValues.validationCounter;
    isSolutionRevealed.value = defaultValues.isSolutionRevealed;
    usedTextSettings.keepSpaces = defaultValues.usedTextSettings.keepSpaces;
    usedTextSettings.keepSpaces = defaultValues.usedTextSettings.keepPunctuation;
    sessionDuration.start = defaultValues.sessionDuration.start;
    sessionDuration.finish = defaultValues.sessionDuration.finish;
  }

  watch(() => sessionStore.activeTextSettings.keepSpaces, (keepSpaces) => {
    usedTextSettings.keepSpaces = sessionStore.activeTextSettings.keepSpaces || keepSpaces;
  });

  watch(() => sessionStore.activeTextSettings.keepPunctuation, (keepPunctuation) => {
    usedTextSettings.keepPunctuation = sessionStore.activeTextSettings.keepPunctuation || keepPunctuation;
  });

  return {
    usedTextSettings, hintManagement, lettersConfirmed, validationCounter, sessionDuration, isSolutionRevealed,
    hintsLeft, isDecryptionSolved, getPrintableSessionDuration, $reset
  };
})