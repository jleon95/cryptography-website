import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTextStore = defineStore('text', () => {
  const encryptedText = ref("");
  const decryptedText = ref("");
  const sessionId = ref("");
  const expirationDate = ref(0); // Stored in milliseconds since 1970 blah blah blah.

  function isSessionExpired() {
    return Date.now() > expirationDate.value;
  }

  function setExpirationDate(newExpirationDate: Date) {
    expirationDate.value = newExpirationDate.getTime();
  }

  function getExpirationDate() {
    return new Date(expirationDate.value);
  }


  return { encryptedText, decryptedText, sessionId, expirationDate, setExpirationDate, getExpirationDate, isSessionExpired };
})