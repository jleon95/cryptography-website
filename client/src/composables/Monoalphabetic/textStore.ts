import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

export const useTextStore = defineStore('text', () => {
  const encryptedText = ref("");
  const decryptedText = ref("");
  const sessionId = ref("");
  const expirationDate = ref(0); // Stored in milliseconds since 1970 blah blah blah to circumvent weird Date operations.
  const letterFrequencies = computed(() => {
    
    const letterFrequencies: { [letter: string]: number } = {};
    let total: number = 0;

    for (const letter of letters)
      letterFrequencies[letter] = 0;

    for (const letter of encryptedText.value)
      if (letter in letterFrequencies) {
        letterFrequencies[letter]++;
        total++;
      }

    // Percentages rounded to 2 decimal places.
    for (const letter in letterFrequencies)
      letterFrequencies[letter] = +((letterFrequencies[letter] * 100 / total).toFixed(2));

    return letterFrequencies;
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

  return { encryptedText, decryptedText, letterFrequencies, sessionId, expirationDate, getSessionId, setExpirationDate, getExpirationDate, isSessionExpired };
})