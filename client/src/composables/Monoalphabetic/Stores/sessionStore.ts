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
  const locallyStoredData = localStorage.getItem("session") ? JSON.parse(localStorage.getItem("session")!) : null;
  const sessionId = locallyStoredData ? ref(locallyStoredData["sessionId"]) : ref(defaultState.sessionId);
  const expirationDate = locallyStoredData ? ref(locallyStoredData["expirationDate"]) : ref(defaultState.expirationDate);
  const activeTextSettings = locallyStoredData ? reactive({ ...locallyStoredData["activeTextSettings"] }) : reactive({ ...defaultState.activeTextSettings });
  const requestingHint = ref(defaultState.requestingHint); // When you load / create a text, you're never in the midst of requesting a hint.
  const sessionExpiredFlag = ref(defaultState.sessionExpiredFlag); // Loading of expired sessions is already prevented, this only triggers the disabling of buttons.
  const sessionExpirationTimer = locallyStoredData ? ref(locallyStoredData["sessionExpirationTimer"]) : ref(null);

  function setExpirationDate(newExpirationDate: Date) {
    expirationDate.value = newExpirationDate.getTime();
  }

  function getExpirationDate() {
    return new Date(expirationDate.value);
  }

  function isSessionExpired() {
    return Date.now() > expirationDate.value;
  }

  function startSessionExpirationTimer() {
    if (sessionExpirationTimer.value !== null)
      clearTimeout(sessionExpirationTimer.value);
    sessionExpirationTimer.value = setTimeout(() => {
      sessionExpiredFlag.value = true;
      deploySessionExpiredPopup();
    }, expirationDate.value - (new Date()).getTime());
  }

  function $reset() {
    sessionId.value = defaultState.sessionId;
    expirationDate.value = defaultState.expirationDate;
    if (sessionExpirationTimer !== null)
      clearTimeout(sessionExpirationTimer.value);
    sessionExpiredFlag.value = false;
    activeTextSettings.keepSpaces = defaultState.activeTextSettings.keepSpaces;
    activeTextSettings.keepPunctuation = defaultState.activeTextSettings.keepPunctuation;
    requestingHint.value = defaultState.requestingHint;
  }

  return {
    sessionId, sessionExpirationTimer, expirationDate, sessionExpiredFlag, requestingHint, activeTextSettings,
    setExpirationDate, getExpirationDate, isSessionExpired, startSessionExpirationTimer, $reset
  };

});