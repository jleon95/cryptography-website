<script setup lang="ts">
  import { useTextStore } from '../../../composables/Monoalphabetic/Stores/textStore';
  import { useGameProgressStore } from '../../../composables/Monoalphabetic/Stores/gameProgressStore';

  const textStore = useTextStore();
  const gameProgressStore = useGameProgressStore();
</script>

<template>
  <div class="main-content-grid-item">
    <div class="decrypted-text-header-info">
      <p class="header-title">Texto desencriptado</p>
      <div class="info-group">

        <div class="show-validations">
          <div class="icon material-symbols-outlined material-icons">
            done_all
          </div>
          <div class="number">
            {{ gameProgressStore.validationCounter }}
          </div>
        </div>

        <div class="show-hints">
          <div class="icon material-symbols-outlined material-icons">
            search
          </div>
          <div class="number">
            {{ gameProgressStore.hintManagement.usedHints }}/{{ gameProgressStore.hintManagement.allowedHints }}
          </div>
        </div>
        
        </div>
      </div>
    <textarea id="decrypted-textarea" readonly>{{ textStore.decryptedText }}</textarea>
  </div>
</template>

<style scoped>
  .main-content-grid-item {
    display: flex;
    flex-direction: column;
    padding: 2% 10% 1% 4%;
  }

  .decrypted-text-header-info {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  p.header-title {
    align-items: center;
    background-color: var(--color-mono-textarea-title-background);
    border: 0.2rem solid var(--color-mono-textarea-title-border);
    border-radius: 1rem 1rem 0 0;
    color: var(--color-mono-textarea-title-text);
    display: inline-flex;
    font-weight: 500;
    height: 100%;
    justify-content: center;
    padding: 0.2rem 0.3rem;
    text-align: center;
    transition: all ease 0.2s;
    width: 33%;
  }

  /*The container for the two circles*/
  .info-group {
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }

  .info-group div:last-child {
    margin-left: 0.2rem;
  }

  /*The containers for the icons*/
  .show-validations,
  .show-hints {
    align-content: center;
    display: flex;
    flex-direction: row-reverse;
  }

  .icon {
    background-color: var(--color-mono-textarea-info-icon-background);
    border-radius: 50%;
    color: var(--color-mono-textarea-info-icon-text);
    margin-left: 0.4rem;
    padding: 0.5rem;
    transition: all ease 0.5s;
  }

  .number {
    align-items: center;
    background-color: var(--color-mono-decrypted-textarea-info-data-background);
    border: 0;
    color: var(--color-mono-decrypted-textarea-info-data-text);
    display: inline-flex; /*Just to center text vertically*/
    font-weight: 500;
    transition: all ease 0.5s;
  }

  .main-content-grid-item > textarea {
    background-color: var(--color-mono-textarea-background);
    border: 0.2rem solid var(--color-mono-textarea-border);
    border-radius: 0 1rem 1rem 1rem;
    color: var(--color-mono-textarea-text);
    height: 23rem;
    line-break: anywhere;
    padding: 0.5rem;
    resize: none;
  }

  .icon:hover {
    background-color: var(--color-mono-decrypted-textarea-info-icon-hover-background);
  }

  .show-validations > .icon:hover ~ .number,
  .show-hints > .icon:hover ~ .number {
    transform: rotate(360deg);
  }

  .reveal-text {
    animation-duration: 3s;
    animation-name: reveal-text;
    animation-timing-function: ease;
  }

  @keyframes reveal-text {
    0% {
      color: var(--color-mono-textarea-text);
      transform: scale(1,1);
      transform-origin: 50% top;
    }
    20% {
      color: white;
      transform: scale(1,1);
      transform-origin: 50% top;
    }
    25% {
      color: white;
      transform: scale(1,1);
      transform-origin: 50% top;
    }
    50% {
      color: white;
      transform: scale(1,0);
      transform-origin: 50% top;
    }
    75% {
      color: white;
      transform: scale(1,1);
      transform-origin: 50% top;
    }
    100% {
      color: var(--color-mono-textarea-text);
      transform: scale(1,1);
      transform-origin: 50% top;
    }
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 40;
  }
</style>