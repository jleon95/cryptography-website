import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

export const useTextStore = defineStore('text', () => {
  const encryptedText = ref("");
  const sessionId = ref("");
  const expirationDate = ref(0); // Stored in milliseconds since 1970 blah blah blah to circumvent weird Date operations.
  const assignedLetters: {[letter: string]: string} = reactive(letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: letter }), {}));
  const letterFrequencies = computed(() => {
    
    // Initialize all counters to 0
    let total: number = 0;
    const letterFrequencies: { [letter: string]: number } = letters.split("").reduce((obj, letter) => ({ ...obj, [letter]: 0 }), {});
    // Count appearances in text
    encryptedText.value.split("").map((letter) => {
      if (letter in letterFrequencies) {
        letterFrequencies[letter]++;
        total++;
      }
    });
    // Percentages rounded to 2 decimal places.
    letters.split("").map((letter) => letterFrequencies[letter] = +((letterFrequencies[letter] * 100 / total).toFixed(2)));

    return letterFrequencies;
  });

  const decryptedText = computed(() => {
    const newText = encryptedText.value.split("").reduce((text, letter: string) => text+assignedLetters[letter], "");
    return newText;
  });

  function isSessionExpired() {
    return Date.now() > expirationDate.value;
  }

  function setExpirationDate(newExpirationDate: Date) {
    expirationDate.value = newExpirationDate.getTime();
    if (isSessionExpired())
      sessionId.value = "";
  }

  function getExpirationDate() {
    return new Date(expirationDate.value);
  }

  function getSessionId() {
    if (isSessionExpired())
      sessionId.value = "";
    return sessionId.value;
  }

  return { encryptedText, decryptedText, assignedLetters, letterFrequencies, sessionId, expirationDate, getSessionId, setExpirationDate, getExpirationDate, isSessionExpired };
})