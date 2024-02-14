import { useGameSessionStore } from '../../composables/Monoalphabetic/gameSessionStore';
import { useTextStore } from '../../composables/Monoalphabetic/textStore';
import { callAPI, Action } from '../../composables/Monoalphabetic/apiCalls';
import type { UpdateTextRequest, UpdateTextResponse } from '../../composables/Monoalphabetic/apiCalls';

function resetTextSettingsStyles() {
  const textSettingsContainer: HTMLElement = document.getElementById("text-settings-container")!;
  const closeTextSettingsButton: HTMLElement = document.getElementById("close-text-settings-button")!;
  textSettingsContainer.style.setProperty("opacity", window.getComputedStyle(textSettingsContainer).getPropertyValue("opacity"));
  textSettingsContainer.classList.remove("inflate-text-settings");
  textSettingsContainer.classList.add("deflate-text-settings");
  closeTextSettingsButton.style.setProperty("opacity", window.getComputedStyle(closeTextSettingsButton).getPropertyValue("opacity"));
  closeTextSettingsButton.classList.remove("inflate-button");
  closeTextSettingsButton.classList.add("deflate-button");
  setTimeout(function () {
    textSettingsContainer.classList.remove("deflate-text-settings");
    textSettingsContainer.style.removeProperty("display");
    textSettingsContainer.style.removeProperty("opacity");
    closeTextSettingsButton.classList.remove("deflate-button");
    closeTextSettingsButton.style.removeProperty("display");
    closeTextSettingsButton.style.removeProperty("opacity");
  }, 700);
}

async function updateTextFromNewSettings() {

  const gameSessionStore = useGameSessionStore();
  let areThereChanges = false;

  if (gameSessionStore.textSettings.current.keepSpaces !== (document.getElementById("keep-spaces-checkbox") as HTMLInputElement).checked) {
    gameSessionStore.textSettings.current.keepSpaces = (document.getElementById("keep-spaces-checkbox") as HTMLInputElement).checked;
    areThereChanges = true;
    if (gameSessionStore.textSettings.current.keepSpaces) // Keep track of which settings were used at any point during the session to show it at the end.
      gameSessionStore.textSettings.used.keepSpaces = true;
  }
  if (gameSessionStore.textSettings.current.keepPunctuation !== (document.getElementById("keep-punctuation-checkbox") as HTMLInputElement).checked) {
    gameSessionStore.textSettings.current.keepPunctuation = (document.getElementById("keep-punctuation-checkbox") as HTMLInputElement).checked;
    areThereChanges = true;
    if (gameSessionStore.textSettings.current.keepPunctuation)
      gameSessionStore.textSettings.used.keepPunctuation = true;
  }

  // I could've just linked gameSessionStore.textDifficultySettings with the two checkbox elements,
  // but then I would've had no way to prevent unnecessary API calls in case the user didn't make any changes.
  if (areThereChanges) {

    const textStore = useTextStore();
    const updateTextRequestBody: UpdateTextRequest = {
      sessionData: {
        sessionId: textStore.getSessionId()
      },
      difficultyOptions: {
        keepSpaces: gameSessionStore.textSettings.current.keepSpaces,
        keepPunctuation: gameSessionStore.textSettings.current.keepPunctuation
      }
    };
    const response: UpdateTextResponse = await callAPI(Action.UPDATE_TEXT, updateTextRequestBody) as UpdateTextResponse;
    if (response.encryptedText)
      textStore.encryptedText = response.encryptedText;
    else
      textStore.resetSessionId();
  }
}

export function updateTextSettings() {
  resetTextSettingsStyles();
  updateTextFromNewSettings();
}

export function deployTextSettings() {
  const gameSessionStore = useGameSessionStore();
  const textSettingsContainer: HTMLElement = document.getElementById("text-settings-container")!;
  const closeTextSettingsButton: HTMLElement = document.getElementById("close-text-settings-button")!;
  (document.getElementById("keep-spaces-checkbox") as HTMLInputElement).checked = gameSessionStore.textSettings.current.keepSpaces;
  (document.getElementById("keep-punctuation-checkbox") as HTMLInputElement).checked = gameSessionStore.textSettings.current.keepPunctuation;
  if (textSettingsContainer.classList.contains("deflate-text-settings"))
    textSettingsContainer.classList.remove("deflate-text-settings");
  textSettingsContainer.classList.add("inflate-text-settings");
  if (closeTextSettingsButton.classList.contains("deflate-button"))
    closeTextSettingsButton.classList.remove("deflate-button");
  closeTextSettingsButton.classList.add("inflate-button");
}