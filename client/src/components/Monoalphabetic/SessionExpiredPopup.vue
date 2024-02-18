<script setup lang="ts">
  import { closeSessionExpiredPopup } from '../../composables/Monoalphabetic/deploySessionExpiredPopup';
</script>

<template>
  <button id="close-session-expired-popup-button" @click="closeSessionExpiredPopup" class="close-session-expired-popup material-symbols-outlined material-icons md-24">close</button>
  <div id="session-expired-popup-container" class="session-expired-popup-container">
    <div class="session-expired-popup-title">Sesión caducada</div>
    <div class="session-expired-popup-body">
      Es posible seguir desencriptando el texto actual, pero las funciones de validación, solicitar pista, ver la solución y cambiar la configuración del texto no estarán disponibles.
    </div>
  </div>
</template>

<style scoped>
  .session-expired-popup-container {
    backdrop-filter: blur(0.2rem);
    border-radius: 1rem;
    bottom: 33%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    display: none;
    height: 22%;
    left: 50%;
    overflow: hidden;
    position: fixed;
    text-align: center;
    transform: translate(-50%,-50%);
    width: 27%;
  }

  .session-expired-popup-title {
    align-items: center;
    background-color: var(--color-text-settings-title-background);
    color: var(--color-text-settings-title-text);
    display: flex;
    font-size: 1.2rem;
    font-weight: 500;
    height: 30%;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .session-expired-popup-body {
    align-items: center;
    background-color: var(--color-text-settings-body-background);
    display: flex;
    height: 70%;
    justify-content: center;
    padding: 1rem 1.5rem;
    text-align: justify;
  }

  button.close-session-expired-popup {
    background: var(--color-text-settings-close-background);
    border: 0.2rem solid var(--color-text-settings-close-border);
    border-radius: 50%;
    bottom: 37%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    color: white;
    cursor: pointer;
    display: none;
    font-weight: 500;
    height: 3.2rem;
    left: 50%;
    position: fixed;
    transform: translateX(-50%);
    transition: all ease 0.2s;
    width: 3.2rem;
  }

  button.close-session-expired-popup:hover {
    background: var(--color-text-settings-close-hover-background);
    border-color: var(--color-text-settings-close-hover-border);
    transform: translateX(-50%) scale(1.1, 1.1);
  }

  button.close-session-expired-popup:active {
    background-color: var(--color-text-settings-close-active-background);
    border-color: var(--color-text-settings-close-active-border);
  }

  div.inflate-session-expired-popup {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-session-expired-popup;
    display: unset;
  }

  button.inflate-button {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-button;
    display: unset;
  }

  div.deflate-session-expired-popup {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-session-expired-popup;
    display: unset;
  }

  button.deflate-button {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-button;
    display: unset;
  }

  @keyframes inflate-session-expired-popup {
    0% {
      left: 50%;
      opacity: 0;
      bottom: 0%;
      transform: translate(-50%,-50%) scale(0,0);
    }

    100% {
      left: 50%;
      opacity: 1;
      bottom: 33%;
      transform: translate(-50%,-50%) scale(1,1);
    }
  }

  @keyframes deflate-session-expired-popup {
    0% {
      left: 50%;
      opacity: 1;
      bottom: 33%;
      transform: translate(-50%,-50%) scale(1,1);
    }

    100% {
      left: 0%;
      opacity: 0;
      bottom: 33%;
      transform: translate(-50%,-50%) scale(1,1);
    }
  }

  @keyframes inflate-button {
    0% {
      left: 50%;
      opacity: 0;
      bottom: 0%;
      transform: translateX(-50%) scale(0,0);
    }

    100% {
      left: 50%;
      opacity: 1;
      bottom: 37%;
      transform: translateX(-50%) scale(1,1);
    }
  }

  @keyframes deflate-button {
    0% {
      left: 50%;
      opacity: 1;
      bottom: 37%;
      transform: translateX(-50%) scale(1,1);
    }

    100% {
      left: 100%;
      opacity: 0;
      bottom: 37%;
      transform: translateX(-50%) scale(1,1);
    }
  }
</style>