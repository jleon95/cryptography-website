import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useGameSessionStore } from './gameSessionStore';

export const useToolbarButtonStatesStore = defineStore("toolbarButtonStates", () => {

  const gameSessionStore = useGameSessionStore();
  const validateDecryptionButton = computed(() => {
    return { disabled: gameSessionStore.isDecryptionSolved() }
  });
  const requestHintButton = computed(() => {
    return { disabled: gameSessionStore.isDecryptionSolved() || !gameSessionStore.hintsLeft() }
  });
  const resetUnconfirmedDecryptionButton = computed(() => {
    return { disabled: gameSessionStore.isDecryptionSolved() }
  });

  return { validateDecryptionButton, requestHintButton, resetUnconfirmedDecryptionButton };
});