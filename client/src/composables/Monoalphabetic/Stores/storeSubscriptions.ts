import { useSessionStore } from './sessionStore';
import { useDecipherGridDOMStatesStore } from './decipherGridDOMStatesStore';
import { useTextStore } from './textStore';
import { useGameProgressStore } from './gameProgressStore';

export function isTherePreviousActiveSession() {
  return localStorage.getItem("session") && JSON.parse(localStorage.getItem("session")!)["expirationDate"] > Date.now();
}

export function subscribeToStores() {

  const sessionStore = useSessionStore();
  sessionStore.$subscribe((mutation, state) => {
    localStorage.setItem("session", JSON.stringify(state));
  }, { detached: true });

  const decipherGridDomStatesStore = useDecipherGridDOMStatesStore();
  decipherGridDomStatesStore.$subscribe((mutation, state) => {
    localStorage.setItem("decipherGridDOMStates", JSON.stringify(state));
  }, { detached: true });

  const textStore = useTextStore();
  textStore.$subscribe((mutation, state) => {
    localStorage.setItem("text", JSON.stringify(state));
  }, { detached: true });

  const gameProgressStore = useGameProgressStore();
  gameProgressStore.$subscribe((mutation, state) => {
    localStorage.setItem("gameProgress", JSON.stringify(state));
  }, { detached: true });
}