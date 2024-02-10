import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useDecipherGridStore, CellState } from './decipherGridStore';

export const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

const defaultState = {
  encryptedText: "",
  sessionId: "",
  expirationDate: 0,
  assignedLetters: letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: "" }), {}) as { [letter: string]: string }
}

export const useTextStore = defineStore('text', () => {
  const decipherGridStore = useDecipherGridStore();
  const encryptedText = ref(defaultState.encryptedText);
  const sessionId = ref(defaultState.sessionId);
  const expirationDate = ref(defaultState.expirationDate); // Stored in milliseconds since 1970 blah blah blah to circumvent weird Date operations.
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
      if (!letterFrequencies[letter]) {
        decipherGridStore.cellEditableStatus[letter] = false;
        decipherGridStore.updateCellState(letter, CellState.DISABLED);
      }
      letterFrequencies[letter] = +((letterFrequencies[letter] * 100 / total).toFixed(2)); // Percentages rounded to 2 decimal places.
    }

    return letterFrequencies;
  });

  const decryptedText = computed(() => {
    const newText = encryptedText.value.split("").reduce((text, letter: string) => assignedLetters[letter] ? (text + assignedLetters[letter]) : (text + letter), "");
    return newText;
  });

  function isSessionExpired() {
    return Date.now() > expirationDate.value;
  }

  function setExpirationDate(newExpirationDate: Date) {
    expirationDate.value = newExpirationDate.getTime();
    if (isSessionExpired())
      sessionId.value = defaultState.sessionId;
  }

  function getExpirationDate() {
    return new Date(expirationDate.value);
  }

  function getSessionId() {
    if (isSessionExpired())
      sessionId.value = defaultState.sessionId;
    return sessionId.value;
  }

  function resetDecryption() {
    for (const letter in assignedLetters)
      assignedLetters[letter] = "";
  }

  return {
    encryptedText, decryptedText, assignedLetters, letterFrequencies, sessionId, expirationDate,
    getSessionId, setExpirationDate, getExpirationDate, isSessionExpired, resetDecryption
  };
})