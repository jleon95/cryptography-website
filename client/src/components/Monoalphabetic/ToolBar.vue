<script setup lang="ts">
  import { useGameDifficultyStore } from '../../composables/Monoalphabetic/gameDifficultyStore';
  import { useTextStore } from '../../composables/Monoalphabetic/textStore';
  import { callAPI, Action } from '../../composables/Monoalphabetic/apiCalls';
  import type { NewTextRequestOptions, NewTextResponse } from '../../composables/Monoalphabetic/apiCalls';

  const gameDifficultyStore = useGameDifficultyStore();
  const textStore = useTextStore();

  async function populateNewText() {
    const options: NewTextRequestOptions = {
      difficultyOptions: {
        keepSpaces: gameDifficultyStore.keepSpaces,
        keepPunctuation: gameDifficultyStore.keepPunctuation
      },
      sessionData: {
        sessionId: textStore.sessionId
      }
    };
    const response: NewTextResponse = await callAPI(Action.NEW_TEXT, options);
    textStore.text = response.encryptedText;
    textStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
  }

  function deployAboutMono() {
    let aboutMono: HTMLElement = document.getElementById("about-mono")!;
    if (aboutMono.classList.contains("deflate-about-mono"))
      aboutMono.classList.remove("deflate-about-mono");
    aboutMono.classList.add("inflate-about-mono-container");
  }
</script>

<template>
  <div class="toolbar-wrapper">
    <div class="tooltip">
      <span class="toolbar-icon material-symbols-outlined material-icons md-24" href="#">check</span>
      <span class="tooltiptext">Validar progreso</span>
    </div>
    <div class="tooltip">
      <span class="toolbar-icon material-symbols-outlined material-icons md-24" href="#">search</span>
      <span class="tooltiptext">Usar una pista</span>
    </div>
    <div class="tooltip">
      <span class="toolbar-icon material-symbols-outlined material-icons md-24" href="#">restart_alt</span>
      <span class="tooltiptext">Reiniciar partida</span>
    </div>
    <div class="tooltip">
      <span @click="populateNewText" class="toolbar-icon material-symbols-outlined material-icons md-24" href="#">add</span>
      <span class="tooltiptext">Nueva partida</span>
    </div>
    <div class="tooltip">
      <span @click="deployAboutMono" class="toolbar-icon material-symbols-outlined material-icons md-24" href="#">question_mark</span>
      <span class="tooltiptext">Acerca del juego</span>
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

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 40;
  }

  .material-icons.md-24 {
    font-size: 24px;
  }
</style>