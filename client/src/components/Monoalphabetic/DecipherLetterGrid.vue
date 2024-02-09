<script setup lang="ts">
  import { processKeyDown, processKeyUp } from '../../composables/Monoalphabetic/updateDecryptedText';
  import { useTextStore } from '../../composables/Monoalphabetic/textStore';
  import { useDecipherGridStore } from '../../composables/Monoalphabetic/decipherGridStore';

  const textStore = useTextStore();
  const decipherGridStore = useDecipherGridStore();
</script>

<template>
  <div class="main-content-grid-item">
    <div class="table-title-container">
      <p>Sustituir letras</p>
    </div>
    <div class="table-grid-container">
      <div v-for="(decrypted, original) in textStore.assignedLetters" class="grid-item">
        <span class="letter">{{ original }}</span>
        <span v-bind:class="decipherGridStore.contentCellStyleClasses[original]" @keydown="processKeyDown" @keyup="processKeyUp" @cut.prevent @paste.prevent @drop.prevent class="content" contenteditable="true">
          {{ decrypted }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-content-grid-item {
    display: flex;
    flex-direction: column;
    padding: 2% 7%;
  }

  div.table-title-container {
    align-items: center;
    background-color: var(--color-mono-table-title-background);
    border: 5px solid var(--color-mono-table-title-border);
    border-radius: 2rem;
    color: var(--color-mono-table-title-text);
    display: flex;
    height: 3rem;
    justify-content: center;
    margin: 0 0 1rem;
    transition: background-color ease 0.2s, border-color ease 0.2s;
    width: 100%;
  }

  div.table-title-container:hover {
    background-color: var(--color-mono-table-title-hover-background);
    border-color: var(--color-mono-table-title-hover-border);
  }

  div.table-title-container p {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }

  div.table-grid-container {
    display: grid;
    grid-template-columns: repeat(9, 11.11111%);
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.2rem;
  }

  .grid-item:hover .letter {
    background-color: var(--color-mono-table-editable-letters-hover-background);
    border-color: var(--color-mono-table-editable-letters-hover-border);
  }

  .grid-item.correct:hover .letter {
    background-color: var(--color-mono-table-letters-hover-background);
    border-color: var(--color-mono-table-letters-hover-background);
  }

  .grid-item:hover .content {
    border-color: var(--color-mono-table-editable-content-hover-border);
  }

  .grid-item.correct:hover .content {
    border-color: var(--color-mono-table-content-hover-border);
  }

  .letter, .content {
    min-height: 2rem;
    text-align: center;
  }

  .letter {
    background-color: var(--color-mono-table-letters-background);
    border: 0.15rem solid var(--color-mono-table-letters-background);
    border-radius: 0.6rem 0.6rem 0 0;
    color: var(--color-mono-table-letters-text);
    font-weight: 500;
    margin: 0.1rem;
    text-transform: uppercase;
    transition: background ease 0.2s, border-color ease 0.2s;
  }

  .content {
    background-color: var(--color-mono-table-content-background);
    border: 0.15rem solid var(--color-mono-table-content-border);
    border-radius: 0 0 0.6rem 0.6rem;
    color: var(--color-mono-table-content-text);
    font-weight: 500;
    margin: 0 0.1rem 0.1rem 0.1rem;
    transition: all ease 0.2s;
    transform: rotateY(0deg);
  }

  .grid-item > .wrong.content {
    animation-name: reveal-wrong-cell;
    animation-duration: 1.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }

  .grid-item > .correct.content {
    animation-name: reveal-correct-cell;
    animation-duration: 1.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }

  @keyframes reveal-wrong-cell {
    0% {
      transform: scale(1, 1);
      color: var(--color-mono-table-content-background);
    }
    20% {
      transform: scale(1.2, 1.1);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    }
    25% {
      transform: scale(0.6, 0.7) rotateY(0deg);
      box-shadow: none;
    }
    66.66% {
      background-color: var(--color-mono-table-content-background);
    }
    100% {
      transform: scale(1, 1) rotateY(1440deg);
      background-color: var(--color-mono-table-content-wrong-background);
    }
  }

  @keyframes reveal-correct-cell {
    0% {
      transform: scale(1, 1);
      color: var(--color-mono-table-content-background);
    }

    20% {
      transform: scale(1.2, 1.1);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    }

    25% {
      transform: scale(0.6, 0.7) rotateY(0deg);
      box-shadow: none;
    }

    66.66% {
      background-color: var(--color-mono-table-content-background);
    }

    100% {
      transform: scale(1, 1) rotateY(1440deg);
      background-color: var(--color-mono-table-content-correct-background);
    }
  }
</style>