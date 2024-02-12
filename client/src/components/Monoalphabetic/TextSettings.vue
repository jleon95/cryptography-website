<script setup lang="ts">
  import { useGameSessionStore } from '../../composables/Monoalphabetic/gameSessionStore';
  import { useTextStore } from '../../composables/Monoalphabetic/textStore';
  import { callAPI, Action } from '../../composables/Monoalphabetic/apiCalls';
  import type { UpdateTextRequest, UpdateTextResponse } from '../../composables/Monoalphabetic/apiCalls';

  const gameSessionStore = useGameSessionStore();
  const textStore = useTextStore();

  function resetTextSettingsStyles() {
    let textSettingsContainer: HTMLElement = document.getElementById("text-settings-container")!;
    let closeTextSettingsButton: HTMLElement = document.getElementById("close-text-settings-button")!;
    textSettingsContainer.style.setProperty("opacity", window.getComputedStyle(textSettingsContainer).getPropertyValue("opacity"));
    closeTextSettingsButton.style.setProperty("opacity", window.getComputedStyle(closeTextSettingsButton).getPropertyValue("opacity"));
    textSettingsContainer.classList.remove("inflate-text-settings");
    closeTextSettingsButton.classList.remove("inflate-text-settings");
    textSettingsContainer.classList.add("deflate-text-settings");
    closeTextSettingsButton.classList.add("deflate-text-settings");
    setTimeout(function () {
      textSettingsContainer.classList.remove("deflate-text-settings");
      textSettingsContainer.style.removeProperty("display");
      textSettingsContainer.style.removeProperty("opacity");
      closeTextSettingsButton.classList.remove("deflate-text-settings");
      closeTextSettingsButton.style.removeProperty("display");
      closeTextSettingsButton.style.removeProperty("opacity");
    }, 700);
  }

  async function updateTextFromNewSettings() {
    gameSessionStore.textDifficultySettings.keepSpaces = (document.getElementById("keep-spaces-checkbox") as HTMLInputElement).checked;
    gameSessionStore.textDifficultySettings.keepPunctuation = (document.getElementById("keep-punctuation-checkbox") as HTMLInputElement).checked;
    const updateTextRequestBody: UpdateTextRequest = {
      sessionData: {
        sessionId: textStore.getSessionId()
      },
      difficultyOptions: {
        keepSpaces: gameSessionStore.textDifficultySettings.keepSpaces,
        keepPunctuation: gameSessionStore.textDifficultySettings.keepPunctuation
      }
    };
    const response: UpdateTextResponse = await callAPI(Action.UPDATE_TEXT, updateTextRequestBody) as UpdateTextResponse;
    if (response.encryptedText)
      textStore.encryptedText = response.encryptedText;
    else
      textStore.resetSessionId();
  }

  function closeTextSettings() {
    resetTextSettingsStyles();
    updateTextFromNewSettings();
  }


</script>

<template>
  <button id="close-text-settings-button" @click="closeTextSettings" class="close-text-settings material-symbols-outlined material-icons md-24">close</button>
  <div id="text-settings-container" class="text-settings-container">
    <div class="text-settings-title">Configuración del texto</div>
    <form class="text-settings-form" action="">
      <div class="text-settings-checkbox-container">
        <input class="text-settings-checkbox" type="checkbox" id="keep-spaces-checkbox" name="keep-spaces" />
        <label class="text-settings-checkbox-label" for="keep-spaces-checkbox">Mantener espacios</label>
      </div>
      <div class="text-settings-checkbox-container">
        <input class="text-settings-checkbox" type="checkbox" id="keep-punctuation-checkbox" name="keep-punctuation" />
        <label class="text-settings-checkbox-label" for="keep-punctuation-checkbox">Mantener puntuación</label>
      </div>
    </form>
  </div>

</template>

<style scoped>
  .text-settings-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 17%;
    height: 21%;
    text-align: center;
    backdrop-filter: blur(0.2rem);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
    overflow: hidden;
    display: none;
  }

  .text-settings-title {
    background-color: hsla(210, 100%, 40%, 0.9);
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: clip;
    width: 100%;
  }

  .text-settings-form {
    background-color: rgba(255,255,255,0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 70%;
    width: 100%;
    padding: 0 10% 0;
  }

  .text-settings-checkbox-container {
    display: flex;
    justify-content: flex-start;
    margin: 0.5rem 0 0.5rem;
  }

  .text-settings-checkbox {
    margin-right: 1rem;
    appearance: none;
    cursor: pointer;
    min-width: 1.9rem;
    min-height: 1.9rem;
    border-radius: 25%;
    margin-top: auto;
    margin-bottom: auto;
    transition: all ease 0.5s;
    background-color: var(--base-lighter-primary);
  }

  .text-settings-checkbox:hover {
    background-color: var(--base-primary);
  }

  .text-settings-checkbox:checked {
    background-color: var(--base-green);
  }

  .text-settings-checkbox-label {
    overflow: clip;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    white-space: nowrap;
  }

  button.close-text-settings {
    background: var(--base-dark-primary);
    border: 0.2rem solid var(--base--dark-primary);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: none;
    font-weight: 500;
    height: 3.2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 50%;
    top: 62%;
    transform: translateX(-50%);
    transition: all ease 0.2s;
    width: 3.2rem;
  }

  button.close-text-settings:hover {
    background: var(--color-aboutthis-close-hover-background);
    border-color: var(--color-aboutthis-close-hover-border);
    transform: translateX(-50%) scale(1.1, 1.1);
  }

  button.close-text-settings:active {
    background-color: var(--color-aboutthis-close-active-background);
    border-color: var(--color-aboutthis-close-active-border);
  }

  div.inflate-text-settings, button.inflate-text-settings {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-text-settings;
    animation-timing-function: ease;
    display: unset;
  }

  div.deflate-text-settings, button.deflate-text-settings {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-text-settings;
    display: unset;
  }

  @keyframes inflate-text-settings {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes deflate-text-settings {
    from { opacity: 1; }
    to { opacity: 0; }
  }
</style>