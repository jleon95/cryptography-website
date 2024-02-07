import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTextStore = defineStore('text', () => {
  const encryptedText = ref("");
  const decryptedText = ref("");
  const sessionId = ref("");
  const expirationDate = ref(0); // Stored in milliseconds since 1970 blah blah blah to circumvent weird Date operations.

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

  return { encryptedText, decryptedText, sessionId, expirationDate, getSessionId, setExpirationDate, getExpirationDate, isSessionExpired };
})