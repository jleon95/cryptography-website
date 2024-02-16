<script setup lang="ts">
  import { populateNewText } from '../../composables/Monoalphabetic/ButtonFunctionality/populateNewText';
  import { validateDecryption } from '../../composables/Monoalphabetic/ButtonFunctionality/validateDecryption';
  import { requestHint } from '../../composables/Monoalphabetic/ButtonFunctionality/requestHint';
  import { deployEndGameScreen } from '../../composables/Monoalphabetic/deployEndgamePopup';
  import { useTextStore } from '../../composables/Monoalphabetic/Stores/textStore';
  import { useToolbarButtonStatesStore } from '../../composables/Monoalphabetic/Stores/toolbarButtonStatesStore'; 
  import { useDecipherGridDOMStatesStore, CellState } from '../../composables/Monoalphabetic/Stores/decipherGridDOMStatesStore';

  const textStore = useTextStore();
  const decipherGridDOMStatesStore = useDecipherGridDOMStatesStore();
  const toolbarButtonStatesStore = useToolbarButtonStatesStore();

  function resetUnconfirmedDecryption() {
    for (const letter in textStore.assignedLetters) {
      if (decipherGridDOMStatesStore.cellEditableStatus[letter]) {
        textStore.assignedLetters[letter] = "";
        decipherGridDOMStatesStore.updateCellState(letter, CellState.DEFAULT);
      }
    }
  }
</script>

<template>
  <div class="toolbar-wrapper">
    <div class="tooltip">
      <span :class="toolbarButtonStatesStore['validateDecryptionButton']" @click="validateDecryption" class="toolbar-icon material-symbols-outlined material-icons md-24">done_all</span>
      <span class="tooltiptext">Validar progreso</span>
    </div>
    <div class="tooltip">
      <span :class="toolbarButtonStatesStore['requestHintButton']" @click="requestHint" class="toolbar-icon material-symbols-outlined material-icons md-24">search</span>
      <span class="tooltiptext">Usar una pista</span>
    </div>
    <div class="tooltip">
      <span :class="toolbarButtonStatesStore['resetUnconfirmedDecryptionButton']" @click="resetUnconfirmedDecryption" class="toolbar-icon material-symbols-outlined material-icons md-24">restart_alt</span>
      <span class="tooltiptext">Reiniciar partida</span>
    </div>
    <div class="tooltip">
      <span @click="populateNewText" class="toolbar-icon material-symbols-outlined material-icons md-24">add</span>
      <span class="tooltiptext">Nueva partida</span>
    </div>
  </div>
</template>

<style scoped>
  .toolbar-wrapper {
    align-items: center;
    background: linear-gradient(var(--color-toolbar-first-background) 0%, var(--color-toolbar-first-background) 20%, var(--color-toolbar-second-background) 20%, var(--color-toolbar-second-background) 100%);
    background-color: var(--color-toolbar-background);
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
  }

  .toolbar-wrapper span.toolbar-icon {
    background: var(--color-toolbar-button-background);
    border: 0.4rem solid var(--color-toolbar-button-border);
    border-radius: 50%;
    color: var(--color-toolbar-button-text);
    cursor: pointer;
    font-weight: var(--toolbar-base-font-weight);
    margin: 0 0.4rem;
    outline-offset: -1px;
    padding: 1rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: all ease 0.5s;
  }

  .toolbar-wrapper span.toolbar-icon:hover {
    background: var(--color-toolbar-button-hover-background);
    border-color: var(--color-toolbar-button-hover-border);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    transform: translate(0, -7%) rotate(360deg);
  }

  .tooltip {
    position: relative;
  }

  .tooltiptext {
    position: absolute;
  }

  .tooltip .tooltiptext {
    background-color: transparent;
    border-radius: 0.5rem;
    color: transparent;
    display: inline-block;
    left: 50%;
    padding: 0.5rem 1rem;
    text-align: center;
    top: -140%;
    transform: translate(-50%, 105%);
    transition: background-color ease 0.6s, color ease 0.6s;
    transition-delay: 1s;
    visibility: hidden;
    white-space: nowrap;
    z-index: 1;
  }

  .tooltip .tooltiptext::after {
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
    background-color: var(--color-toolbar-button-tooltip-background);
    color: var(--color-toolbar-button-tooltip-text);
    visibility: visible;
  }

  .tooltip:hover .tooltiptext::after {
    border-color: var(--color-toolbar-button-tooltip-border) transparent transparent transparent;
    visibility: visible;
  }

  .toolbar-wrapper span.toolbar-icon:active {
    background-color: var(--color-toolbar-button-active-background);
  }

  .toolbar-wrapper .toolbar-icon.disabled {
    background-color: var(--color-disabled-button);
    pointer-events: none;
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 40;
  }

  .material-icons.md-24 {
    font-size: 24px;
  }
</style>