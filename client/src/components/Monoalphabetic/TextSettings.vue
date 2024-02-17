<script setup lang="ts">
  import { updateTextSettings } from '../../composables/Monoalphabetic/ButtonFunctionality/changeTextSettings';
</script>

<template>
  <button id="close-text-settings-button" @click="updateTextSettings" class="close-text-settings material-symbols-outlined material-icons md-24">check</button>
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
    backdrop-filter: blur(0.2rem);
    border-radius: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    display: none;
    height: 21%;
    left: 50%;
    overflow: hidden;
    position: fixed;
    text-align: center;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 17%;
  }

  .text-settings-title {
    align-items: center;
    background-color: var(--color-text-settings-title-background);
    color: var(--color-text-settings-title-text);
    display: flex;
    font-size: 1.2rem;
    font-weight: 500;
    height: 30%;
    justify-content: center;
    overflow: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .text-settings-form {
    align-content: center;
    background-color: var(--color-text-settings-body-background);
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: center;
    padding: 0 10% 0;
    width: 100%;
  }

  .text-settings-checkbox-container {
    display: flex;
    justify-content: flex-start;
    margin: 0.5rem 0 0.5rem;
  }

  .text-settings-checkbox {
    appearance: none;
    background-color: var(--color-text-settings-checkbox-unchecked-background);
    border-radius: 25%;
    cursor: pointer;
    margin-bottom: auto;
    margin-right: 1rem;
    margin-top: auto;
    min-height: 1.9rem;
    min-width: 1.9rem;
    transition: all ease 0.5s;
  }

  .text-settings-checkbox:hover {
    background-color: var(--color-text-settings-checkbox-hover-background);
  }

  .text-settings-checkbox:checked {
    background-color: var(--color-text-settings-checkbox-checked-background);
  }

  .text-settings-checkbox-label {
    font-size: 1.1rem;
    overflow: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button.close-text-settings {
    background: var(--color-text-settings-close-background);
    border: 0.2rem solid var(--color-text-settings-close-border);
    border-radius: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    color: white;
    cursor: pointer;
    display: none;
    font-weight: 500;
    height: 3.2rem;
    left: 50%;
    position: fixed;
    top: 62%;
    transform: translateX(-50%);
    transition: all ease 0.2s;
    width: 3.2rem;
  }

  button.close-text-settings:hover {
    background: var(--color-text-settings-close-hover-background);
    border-color: var(--color-text-settings-close-hover-border);
    transform: translateX(-50%) scale(1.1, 1.1);
  }

  button.close-text-settings:active {
    background-color: var(--color-text-settings-close-active-background);
    border-color: var(--color-text-settings-close-active-border);
  }

  div.inflate-text-settings {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-text-settings;
    display: unset;
  }

  button.inflate-button {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-button;
    display: unset;
  }

  div.deflate-text-settings {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-text-settings;
    display: unset;
  }

  button.deflate-button {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-button;
    display: unset;
  }

  @keyframes inflate-text-settings {
    0% {
      left: 50%;
      opacity: 0;
      top: 0%;
      transform: translate(-50%,-50%) scale(0,0);
    }
    100% {
      left: 50%;
      opacity: 1;
      top: 50%;
      transform: translate(-50%,-50%) scale(1,1);
    }
  }

  @keyframes deflate-text-settings {
    0% {
      left: 50%;
      opacity: 1;
      top: 50%;
      transform: translate(-50%,-50%) scale(1,1);
    }
    100% {
      left: 0%;
      opacity: 0;
      top: 50%;
      transform: translate(-50%,-50%) scale(1,1);
    }
  }

  @keyframes inflate-button {
    0% {
      left: 50%;
      opacity: 0;
      top: 0%;
      transform: translateX(-50%) scale(0,0);
    }
    100% {
      left: 50%;
      opacity: 1;
      top: 62%;
      transform: translateX(-50%) scale(1,1);
    }
  }

  @keyframes deflate-button {
    0% {
      left: 50%;
      opacity: 1;
      top: 62%;
      transform: translateX(-50%) scale(1,1);
    }
    100% {
      left: 100%;
      opacity: 0;
      top: 62%;
      transform: translateX(-50%) scale(1,1);
    }
  }
</style>