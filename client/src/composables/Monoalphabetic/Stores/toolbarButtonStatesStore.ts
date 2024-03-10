import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useGameProgressStore } from './gameProgressStore';
import { useSessionStore } from './sessionStore';

export const useToolbarButtonStatesStore = defineStore("toolbarButtonStates", () => {

  const sessionStore = useSessionStore();
  const gameProgressStore = useGameProgressStore();
  const validateDecryptionButton = computed(() => {
    return { disabled: sessionStore.sessionExpiredFlag || gameProgressStore.isDecryptionSolved() || gameProgressStore.isSolutionRevealed }
  });
  const requestHintButton = computed(() => {
    return { disabled: sessionStore.sessionExpiredFlag || gameProgressStore.isDecryptionSolved() || gameProgressStore.isSolutionRevealed || !gameProgressStore.hintsLeft() }
  });
  const resetUnconfirmedDecryptionButton = computed(() => {
    return { disabled: gameProgressStore.isDecryptionSolved() || gameProgressStore.isSolutionRevealed }
  });
  const displaySolutionButton = computed(() => {
    return { disabled: sessionStore.sessionExpiredFlag || gameProgressStore.isSolutionRevealed }
  });
  const deployTextSettingsButton = computed(() => {
    return { disabled: sessionStore.sessionExpiredFlag }
  });
  const newTextButton = computed(() => {
    return { disabled: sessionStore.loadingSolution }
  });

  return { validateDecryptionButton, requestHintButton, resetUnconfirmedDecryptionButton, displaySolutionButton, deployTextSettingsButton, newTextButton };
});