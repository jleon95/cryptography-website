<script setup lang="ts">
  import { ref } from 'vue';

  type GridItem = { letter: string; content: any; };

  let gridItemList: Array<GridItem> = [];
  const letters: string = "abcdefghijklmnñopqrstuvwxyz";
  const allowedInputSet: Set<string> = new Set(letters);
  allowedInputSet.add("Backspace");

  for (let i = 0; i < letters.length; i++) {
    let item: GridItem = { letter: letters[i], content: "" };
    gridItemList.push(item);
  }

  const items = ref(gridItemList);

  function processKeyDown(e: KeyboardEvent) {
    if (!allowedInputSet.has(e.key) || e.target.textContent.length > 0 && e.key != "Backspace")
      e.preventDefault()
  }
</script>

<template>
  <div class="main-content-grid-item">
    <div class="table-title-container">
      <p>Sustituir letras</p>
    </div>
    <div class="table-grid-container">
      <div v-for="item in items" class="grid-item">
        <span class="letter">{{ item.letter }}</span>
        <span @keydown="processKeyDown" @cut.prevent @paste.prevent @drop.prevent class="content" contenteditable="true">{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-content-grid-item {
    display: flex;
    flex-direction: column;
    padding: 2% 10%;
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
    background: var(--color-mono-table-editable-letters-hover-background);
    border-color: var(--color-mono-table-editable-letters-hover-border);
  }

  .grid-item:hover .content {
    background: var(--color-mono-table-editable-content-hover-background);
    border-color: var(--color-mono-table-editable-content-hover-border);
  }

  .letter, .content {
    min-height: 2rem;
    text-align: center;
  }

  .letter {
    background: var(--color-mono-table-letters-background);
    border: 0.15rem solid var(--color-mono-table-letters-background);
    border-radius: 0.6rem 0.6rem 0 0;
    color: var(--color-mono-table-letters-text);
    font-weight: 500;
    margin: 0.1rem;
    text-transform: uppercase;
    transition: background ease 0.2s, border-color ease 0.2s;
  }

  .content {
    background: var(--color-mono-table-content-background);
    border: 0.15rem solid var(--color-mono-table-content-border);
    border-radius: 0 0 0.6rem 0.6rem;
    color: var(--color-mono-table-content-text);
    font-weight: 500;
    margin: 0 0.1rem 0.1rem 0.1rem;
    transition: background ease 0.2s, border-color ease 0.2s;
  }
</style>