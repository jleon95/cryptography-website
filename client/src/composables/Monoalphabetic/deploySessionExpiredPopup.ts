import { resetAnimationsOfElement } from './utils';

export function isSessionExpiredPopupDeployed() {
  return document.getElementById("session-expired-popup-container")!.classList.contains("inflate-session-expired-popup");
}

export function closeSessionExpiredPopup() {
  const sessionExpiredPopupContainer: HTMLElement = document.getElementById("session-expired-popup-container")!;
  const closeSessionExpiredPopupButton: HTMLElement = document.getElementById("close-session-expired-popup-button")!;
  sessionExpiredPopupContainer.style.setProperty("opacity", window.getComputedStyle(sessionExpiredPopupContainer).getPropertyValue("opacity"));
  resetAnimationsOfElement(sessionExpiredPopupContainer, "inflate-session-expired-popup", "deflate-session-expired-popup");
  closeSessionExpiredPopupButton.style.setProperty("opacity", window.getComputedStyle(closeSessionExpiredPopupButton).getPropertyValue("opacity"));
  resetAnimationsOfElement(closeSessionExpiredPopupButton, "inflate-button", "deflate-button");
  setTimeout(function () {
    sessionExpiredPopupContainer.style.removeProperty("display");
    sessionExpiredPopupContainer.style.removeProperty("opacity");
    resetAnimationsOfElement(sessionExpiredPopupContainer, "deflate-session-expired-popup");
    closeSessionExpiredPopupButton.style.removeProperty("display");
    closeSessionExpiredPopupButton.style.removeProperty("opacity");
    resetAnimationsOfElement(closeSessionExpiredPopupButton, "deflate-button");
  }, 700);
}

export function deploySessionExpiredPopup() {
  const sessionExpiredPopupContainer: HTMLElement = document.getElementById("session-expired-popup-container")!;
  const closeSessionExpiredPopupButton: HTMLElement = document.getElementById("close-session-expired-popup-button")!;
  resetAnimationsOfElement(sessionExpiredPopupContainer, "deflate-session-expired-popup", "inflate-session-expired-popup");
  resetAnimationsOfElement(closeSessionExpiredPopupButton, "deflate-button", "inflate-button");
}