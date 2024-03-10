import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useDecipherGridDOMStatesStore, CellState } from './decipherGridDOMStatesStore';

export const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

const defaultState = {
  encryptedText: "",
  assignedLetters: letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: "" }), {}) as { [letter: string]: string },
  originalText: ""
}

export const useTextStore = defineStore('text', () => {
  const locallyStoredData = localStorage.getItem("text") ? JSON.parse(localStorage.getItem("text")!) : null;
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const encryptedText = locallyStoredData ? ref(locallyStoredData["encryptedText"]) : ref(defaultState.encryptedText);
  const assignedLetters: { [letter: string]: string } = locallyStoredData ? reactive(locallyStoredData["assignedLetters"]) : reactive(defaultState.assignedLetters);
  const originalText = locallyStoredData ? ref(locallyStoredData["originalText"]) : ref(defaultState.originalText);
  const letterFrequencies = computed(() => {
    
    // Initialize all counters to 0
    let total: number = 0;
    const letterFrequencies: { [letter: string]: number } = letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: 0 }), {});

    for (const character of encryptedText.value) {
      if (character in letterFrequencies) {
        letterFrequencies[character]++;
        total++;
      }
    }
    
    for (const letter in letterFrequencies) {
      if (!letterFrequencies[letter])
        decipherGridDOMStatesStore.updateCellState(letter, CellState.DISABLED);
      if (total)
        letterFrequencies[letter] = +((letterFrequencies[letter] * 100 / total).toFixed(2)); // Percentages rounded to 2 decimal places.
      else
        letterFrequencies[letter] = 0;
    }

    return letterFrequencies;
  });

  const decryptedText = computed(() => {
    if (!originalText.value)
      return encryptedText.value.split("").reduce((text: string, letter: string) => assignedLetters[letter] ? (text + assignedLetters[letter]) : (text + letter), "");
    else
      return originalText.value;
  });

  function $reset() {
    encryptedText.value = defaultState.encryptedText;
    originalText.value = defaultState.originalText;
    for (const letter in assignedLetters)
      assignedLetters[letter] = "";
  }

  return {
    encryptedText, decryptedText, originalText, assignedLetters, letterFrequencies, $reset
  };
})