import { useSessionStore } from '../Stores/sessionStore';
import { useTextStore } from '../Stores/textStore';
import { callAPI, Action } from '../apiCalls';
import { resetAnimationsOfElement } from '../utils';
import type { UpdateTextRequest, UpdateTextResponse } from '../apiCalls';

function resetTextSettingsStyles() {
  const textSettingsContainer: HTMLElement = document.getElementById("text-settings-container")!;
  const closeTextSettingsButton: HTMLElement = document.getElementById("close-text-settings-button")!;
  textSettingsContainer.style.setProperty("opacity", window.getComputedStyle(textSettingsContainer).getPropertyValue("opacity"));
  resetAnimationsOfElement(textSettingsContainer, "inflate-text-settings", "deflate-text-settings");
  closeTextSettingsButton.style.setProperty("opacity", window.getComputedStyle(closeTextSettingsButton).getPropertyValue("opacity"));
  resetAnimationsOfElement(closeTextSettingsButton, "inflate-button", "deflate-button");
  setTimeout(function () {
    textSettingsContainer.style.removeProperty("display");
    textSettingsContainer.style.removeProperty("opacity");
    resetAnimationsOfElement(textSettingsContainer, "deflate-text-settings");
    closeTextSettingsButton.style.removeProperty("display");
    closeTextSettingsButton.style.removeProperty("opacity");
    resetAnimationsOfElement(closeTextSettingsButton, "deflate-button");
  }, 700);
}

async function updateTextFromNewSettings() {

  const sessionStore = useSessionStore();

  if (sessionStore.isSessionExpired())
    return;

  let areThereChanges = false;

  if (sessionStore.activeTextSettings.keepSpaces !== (document.getElementById("keep-spaces-checkbox") as HTMLInputElement).checked) {
    sessionStore.activeTextSettings.keepSpaces = (document.getElementById("keep-spaces-checkbox") as HTMLInputElement).checked;
    areThereChanges = true;
  }
  if (sessionStore.activeTextSettings.keepPunctuation !== (document.getElementById("keep-punctuation-checkbox") as HTMLInputElement).checked) {
    sessionStore.activeTextSettings.keepPunctuation = (document.getElementById("keep-punctuation-checkbox") as HTMLInputElement).checked;
    areThereChanges = true;
  }

  // I could've just linked gameSessionStore.textDifficultySettings with the two checkbox elements,
  // but then I would've had no way to prevent unnecessary API calls in case the user didn't make any changes.
  if (areThereChanges) {

    const textStore = useTextStore();
    const updateTextRequestBody: UpdateTextRequest = {
      sessionData: {
        sessionId: sessionStore.sessionId
      },
      difficultyOptions: {
        keepSpaces: sessionStore.activeTextSettings.keepSpaces,
        keepPunctuation: sessionStore.activeTextSettings.keepPunctuation
      }
    };
    const response: UpdateTextResponse = await callAPI(Action.UPDATE_TEXT, updateTextRequestBody) as UpdateTextResponse;
    if ("sessionData" in response) {
      sessionStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
      sessionStore.startSessionExpirationTimer();
      textStore.encryptedText = response.encryptedText;
    }
    else // If the server responds with empty sessionData, the update text request was rejected.
      sessionStore.$reset();
  }
}

export function updateTextSettings() {
  resetTextSettingsStyles();
  updateTextFromNewSettings();
}

export function deployTextSettings() {
  const sessionStore = useSessionStore();
  const textSettingsContainer: HTMLElement = document.getElementById("text-settings-container")!;
  const closeTextSettingsButton: HTMLElement = document.getElementById("close-text-settings-button")!;
  (document.getElementById("keep-spaces-checkbox") as HTMLInputElement).checked = sessionStore.activeTextSettings.keepSpaces;
  (document.getElementById("keep-punctuation-checkbox") as HTMLInputElement).checked = sessionStore.activeTextSettings.keepPunctuation;
  resetAnimationsOfElement(textSettingsContainer, "deflate-text-settings", "inflate-text-settings");
  resetAnimationsOfElement(closeTextSettingsButton, "deflate-button", "inflate-button");
}