import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameDifficultyStore = defineStore('gameDifficulty', () => {
  const keepSpaces = ref(false);
  const keepPunctuation = ref(false);

  function activateSpaces() {
    keepSpaces.value = true;
  }

  function deactivateSpaces() {
    keepSpaces.value = false;
  }

  function activatePunctuation() {
    keepPunctuation.value = true;
  }

  function deactivatePunctuation() {
    keepPunctuation.value = false;
  }

  return { keepSpaces, keepPunctuation, activateSpaces, deactivateSpaces, activatePunctuation, deactivatePunctuation };
})