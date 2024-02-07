import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTextStore = defineStore('text', () => {
  const text = ref("");
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


  return { text, sessionId, expirationDate, setExpirationDate, getExpirationDate, isSessionExpired };
})