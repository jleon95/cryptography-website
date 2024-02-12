<script setup lang="ts">
  import { useTextStore } from '../../composables/Monoalphabetic/textStore';
  import { useGameSessionStore } from '../../composables/Monoalphabetic/gameSessionStore';

  const textStore = useTextStore();
  const gameSessionStore = useGameSessionStore();
</script>

<template>
  <div class="main-content-grid-item">
    <div class="decrypted-text-header-info">
      <p class="header-title">Texto desencriptado</p>
      <div class="info-group">

        <div class="show-validations">
          <div class="icon material-symbols-outlined material-icons md-20">
            check
          </div>
          <div class="data-container-validations">
            <div class="number">{{ gameSessionStore.validationCounter }}</div>
          </div>
        </div>
        <div class="show-hints">
          <div class="icon material-symbols-outlined material-icons md-20">
            search
          </div>
          <div class="data-container-hints">
            <div class="number">{{ gameSessionStore.hintManagement.usedHints }}/{{ gameSessionStore.hintManagement.allowedHints }}</div>
          </div>
        </div>
        
        </div>
      </div>
    <textarea readonly>{{ textStore.decryptedText }}</textarea>
  </div>
</template>

<style scoped>
  .main-content-grid-item {
    display: flex;
    flex-direction: column;
    padding: 2% 7%;
  }

  .decrypted-text-header-info {
    align-items: center;
    display: flex;
  }

  .decrypted-text-header-info {
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
  }

  /*The containers for the icons*/
  .show-validations,
  .show-hints {
    align-content: center;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 0.2rem;
  }

  .icon:hover {
    background-color: var(--color-mono-textarea-info-icon-hover-background);
  }

  .show-validations > .icon:hover ~ .data-container-validations,
  .show-hints > .icon:hover ~ .data-container-hints {
    transform: rotate(360deg);
  }

  .icon {
    background-color: var(--color-mono-textarea-info-icon-background);
    border-radius: 50%;
    color: var(--color-mono-textarea-info-icon-text);
    margin: 0 0.4rem 0.2rem;
    padding: 0.35rem 0.5rem;
    transition: all ease 0.5s;
  }

  .number {
    font-weight: 500;
    margin: 0 0.3rem 0.2rem;
  }

  .data-container-validations,
  .data-container-hints {
    align-items: center;
    background-color: var(--color-mono-textarea-info-data-background);
    border: 0;
    color: var(--color-mono-textarea-info-data-text);
    display: inline-flex; /*Just to center text vertically*/
    transition: all ease 0.5s;
  }

  .main-content-grid-item > textarea {
    background-color: var(--color-mono-textarea-text);
    border: 0.2rem solid var(--color-mono-textarea-border);
    border-radius: 0 0rem 1rem 1rem;
    height: 25rem;
    line-break: anywhere;
    padding: 0.5rem;
    resize: none;
    transition: all ease 0.2s;
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 40;
  }

  .material-icons.md-20 {
    font-size: 20px;
    line-height: initial;
  }
</style>