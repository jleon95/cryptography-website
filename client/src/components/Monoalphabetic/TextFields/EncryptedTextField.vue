<script setup lang="ts">
  import { useTextStore } from '../../../composables/Monoalphabetic/Stores/textStore';
  import { useToolbarButtonStatesStore } from '../../../composables/Monoalphabetic/Stores/toolbarButtonStatesStore'; 
  import { deployTextSettings } from '../../../composables/Monoalphabetic/ButtonFunctionality/changeTextSettings';
  import { deployAboutMono } from '../../../composables/Monoalphabetic/AboutMono/deployAboutMono';

  const textStore = useTextStore();
  const toolbarButtonStatesStore = useToolbarButtonStatesStore();
</script>

<template>
  <div class="main-content-grid-item">
    <div class="decrypted-text-header-info">
      <p class="header-title">Texto encriptado</p>
      <div class="info-group">
        <div class="tooltip">
          <span @click="deployAboutMono" class="icon material-symbols-outlined material-icons help">
            question_mark
          </span>
          <span class="tooltiptext">Ayuda</span>
        </div>
        <div class="tooltip">
          <span :class="toolbarButtonStatesStore['deployTextSettingsButton']" @click="deployTextSettings" class="icon material-symbols-outlined material-icons text-settings">
            settings
          </span>
          <span class="tooltiptext">Opciones del texto</span>
        </div>
      </div>
    </div>
    <textarea id="encrypted-textarea" readonly>{{ textStore.encryptedText }}</textarea>
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

  .info-group .tooltip:last-child {
    margin-left: 0.4rem;
  }

  .tooltip {
    position: relative;
  }

  .tooltiptext {
    background-color: transparent;
    border-radius: 0.5rem;
    color: transparent;
    display: inline-block;
    left: 50%;
    padding: 0.5rem 1rem;
    position: absolute;
    text-align: center;
    top: -120%;
    transform: translate(-50%, 0);
    transition: background-color ease 0.6s, color ease 0.6s;
    transition-delay: 1s;
    visibility: hidden;
    white-space: nowrap;
    z-index: 1;
  }

  .tooltiptext::after {
    border-color: transparent transparent transparent transparent;
    border-style: solid;
    border-width: 0.4rem;
    content: "";
    left: 50%;
    position: absolute;
    top: 100%;
    transform: translate(-50%, 0%);
    transition: border-color ease 0.6s;
    transition-delay: 1s;
  }

  .tooltip:hover .tooltiptext {
    background-color: var(--color-mainpage-button-tooltip-background);
    border-color: var(--color-mainpage-button-tooltip-border) transparent transparent transparent;
    color: var(--color-mainpage-button-tooltip-text);
    visibility: visible;
  }

  .tooltip:hover .tooltiptext::after {
    border-color: var(--color-toolbar-button-tooltip-border) transparent transparent transparent;
    visibility: visible;
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

  .icon.text-settings:hover {
    background-color: var(--color-mono-encrypted-textarea-icon-hover-background);
    transform: rotate(360deg);
  }

  .icon.text-settings.disabled {
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
    font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 40;
  }
</style>