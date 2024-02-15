import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useDecipherGridDOMStatesStore, CellState } from './decipherGridDOMStatesStore';

export const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

const defaultState = {
  encryptedText: "",
  assignedLetters: letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: "" }), {}) as { [letter: string]: string }
}

export const useTextStore = defineStore('text', () => {
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const encryptedText = ref(defaultState.encryptedText);
  const assignedLetters: { [letter: string]: string } = reactive(defaultState.assignedLetters);
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
      letterFrequencies[letter] = +((letterFrequencies[letter] * 100 / total).toFixed(2)); // Percentages rounded to 2 decimal places.
    }

    return letterFrequencies;
  });

  const decryptedText = computed(() => {
    return encryptedText.value.split("").reduce((text, letter: string) => assignedLetters[letter] ? (text + assignedLetters[letter]) : (text + letter), "");
  });

  function $reset() {
    encryptedText.value = defaultState.encryptedText;
    for (const letter in assignedLetters)
      assignedLetters[letter] = "";
  }

  return {
    encryptedText, decryptedText, assignedLetters, letterFrequencies, $reset
  };
})