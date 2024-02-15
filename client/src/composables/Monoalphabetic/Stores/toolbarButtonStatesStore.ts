import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useGameProgressStore } from './gameProgressStore';

export const useToolbarButtonStatesStore = defineStore("toolbarButtonStates", () => {

  const gameProgressStore = useGameProgressStore();
  const validateDecryptionButton = computed(() => {
    return { disabled: gameProgressStore.isDecryptionSolved() }
  });
  const requestHintButton = computed(() => {
    return { disabled: gameProgressStore.isDecryptionSolved() || !gameProgressStore.hintsLeft() }
  });
  const resetUnconfirmedDecryptionButton = computed(() => {
    return { disabled: gameProgressStore.isDecryptionSolved() }
  });

  return { validateDecryptionButton, requestHintButton, resetUnconfirmedDecryptionButton };
});