import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { deploySessionExpiredPopup } from '../deploySessionExpiredPopup';

const defaultState = {
  sessionId: "",
  expirationDate: 0,
  activeTextSettings: {
    keepSpaces: false,
    keepPunctuation: false
  },
  requestingHint: false,
  sessionExpiredFlag: false
}

export const useSessionStore = defineStore('session', () => {
  const sessionId = ref(defaultState.sessionId);
  const expirationDate = ref(defaultState.expirationDate); // Stored in milliseconds since 1970 blah blah blah to circumvent weird Date operations.
  const activeTextSettings = reactive({ ...defaultState.activeTextSettings });
  const requestingHint = ref(defaultState.requestingHint);
  const sessionExpiredFlag = ref(defaultState.sessionExpiredFlag);
  let sessionExpirationTimer: number | null = null;

  function setExpirationDate(newExpirationDate: Date, startTimer: boolean = true) {
    expirationDate.value = newExpirationDate.getTime();
    if (startTimer)
      startSessionExpirationTimer()
  }

  function getExpirationDate() {
    return new Date(expirationDate.value);
  }

  function isSessionExpired() {
    return Date.now() > expirationDate.value;
  }

  function startSessionExpirationTimer() {
    if (sessionExpirationTimer !== null)
      clearTimeout(sessionExpirationTimer);
    sessionExpirationTimer = setTimeout(() => {
      sessionExpiredFlag.value = true;
      deploySessionExpiredPopup();
    }, expirationDate.value - (new Date()).getTime());
  }

  function $reset() {
    sessionId.value = defaultState.sessionId;
    expirationDate.value = defaultState.expirationDate;
    if (sessionExpirationTimer !== null)
      clearTimeout(sessionExpirationTimer);
    sessionExpiredFlag.value = false;
    activeTextSettings.keepSpaces = defaultState.activeTextSettings.keepSpaces;
    activeTextSettings.keepPunctuation = defaultState.activeTextSettings.keepPunctuation;
    requestingHint.value = defaultState.requestingHint;
  }

  return {
    sessionId, sessionExpiredFlag, requestingHint, activeTextSettings,
    setExpirationDate, getExpirationDate, isSessionExpired, startSessionExpirationTimer, $reset
  };

});