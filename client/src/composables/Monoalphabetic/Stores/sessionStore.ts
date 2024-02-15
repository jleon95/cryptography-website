import { defineStore } from 'pinia';
import { reactive, ref} from 'vue';

const defaultState = {
  sessionId: "",
  expirationDate: 0,
  activeTextSettings: {
    keepSpaces: false,
    keepPunctuation: false
  },
  requestingHint: false
}

export const useSessionStore = defineStore('session', () => {
  const sessionId = ref(defaultState.sessionId);
  const expirationDate = ref(defaultState.expirationDate); // Stored in milliseconds since 1970 blah blah blah to circumvent weird Date operations.
  const activeTextSettings = reactive({ ...defaultState.activeTextSettings });
  const requestingHint = ref(defaultState.requestingHint);

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

  function getSessionIdCheckedForExpiration() {
    if (isSessionExpired())
      sessionId.value = defaultState.sessionId;
    return sessionId.value;
  }

  function resetSessionId() {
    sessionId.value = defaultState.sessionId;
  }

  return { sessionId, getSessionIdCheckedForExpiration, resetSessionId, isSessionExpired, requestingHint, getExpirationDate, setExpirationDate, activeTextSettings };

});