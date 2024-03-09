<script setup lang="ts">
  import { useTextStore } from '../../composables/Monoalphabetic/Stores/textStore';
  import { useToolbarButtonStatesStore } from '../../composables/Monoalphabetic/Stores/toolbarButtonStatesStore'; 
  import { deployTextSettings } from '../../composables/Monoalphabetic/ButtonFunctionality/changeTextSettings';
  import { deployAboutMono } from '../../composables/Monoalphabetic/AboutMono/deployAboutMono';

  const textStore = useTextStore();
  const toolbarButtonStatesStore = useToolbarButtonStatesStore();
</script>

<template>
  <div class="main-content-grid-item">
    <div class="decrypted-text-header-info">
      <p class="header-title">Texto encriptado</p>
      <div class="info-group">
        <div @click="deployAboutMono" class="icon material-symbols-outlined material-icons help">
          question_mark
        </div>
        <div :class="toolbarButtonStatesStore['deployTextSettingsButton']" @click="deployTextSettings" class="icon material-symbols-outlined material-icons not-help">
          settings
        </div>
      </div>
    </div>
    <textarea readonly>{{ textStore.encryptedText }}</textarea>
  </div>
</template>

<style scoped>
  .main-content-grid-item {
    display: flex;
    flex-direction: column;
    padding: 2% 4% 1% 10%;
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

  .info-group {
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }

  .info-group .icon:last-child {
    margin-left: 0.4rem;
  }

  .icon {
    background-color: var(--color-mono-textarea-info-icon-background);
    border-radius: 50%;
    color: var(--color-mono-textarea-info-icon-text);
    cursor: pointer;
    padding: 0.5rem;
    transition: all ease 0.5s;
  }

  .icon.help {
    background-color: var(--color-mono-encrypted-textarea-help-icon-background);
  }

  .icon.help:hover {
    background-color: var(--color-mono-encrypted-textarea-icon-hover-background);
    transform: rotate(360deg);
  }

  .icon.not-help:hover {
    background-color: var(--color-mono-encrypted-textarea-icon-hover-background);
    transform: rotate(360deg);
  }

  .icon.not-help.disabled {
    background-color: var(--color-disabled-button);
    pointer-events: none;
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
    transition: all ease 0.2s;
  }
</style>