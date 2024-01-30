<script setup lang="ts">
  import { ref } from 'vue';

  type GridItem = { letter: string; content: any; };
  let gridItemList: Array<GridItem> = [];
  let isTableDeployed: boolean = false;

  const letters: string = "abcdefghijklmnñopqrstuvwxyz";
  const percentages: Array<number> = [12.53, 1.42, 4.68, 5.86, 13.68, 0.69, 1.01, 0.7, 6.25,
    0.44, 0.02, 4.97, 3.15, 6.71, 0.31, 8.68, 2.51, 0.88,
    6.87, 7.98, 4.63, 3.93, 0.9, 0.01, 0.22, 0.9, 0.52];

  for (let i = 0; i < letters.length; i++) {
    let item: GridItem = { letter: letters[i], content: percentages[i] };
    gridItemList.push(item);
  }

  let onceTransitionEnds = (transitionElement: Element|null, transitionClass: string, statesToRemove: Array<string>) => {
    return new Promise(resolve => {
      const onTransitionEndCb = () => {
        transitionElement.removeEventListener('transitionend', onTransitionEndCb);
        for (const state of statesToRemove) {
          transitionElement.classList.remove(state);
        }
        resolve();
      }
      transitionElement.addEventListener('transitionend', onTransitionEndCb, { once: true });
      transitionElement.classList.add(transitionClass);
    });
  }

  function resetTableDeployment () {
    let tableTitleContainer = document.getElementById("spanish-table-title-container");
    let tableTitleIcon = document.getElementById("spanish-table-title-icon");
    let tableTitleText = document.getElementById("spanish-table-title-text");

    tableTitleContainer.classList.remove("expanded-title-container");

    tableTitleIcon.classList.add("faded-in-info-icon");
    tableTitleIcon.classList.add("displayed-info-icon");
    tableTitleIcon.classList.remove("faded-out-info-icon");
    tableTitleIcon.classList.remove("undisplayed-info-icon");

    tableTitleText.classList.remove("faded-in-title-text");
    tableTitleText.classList.remove("displayed-title-text");
    tableTitleText.classList.add("faded-out-title-text");
    tableTitleText.classList.add("undisplayed-title-text");
  }

  async function deployTable() {

    let tableTitleContainer = document.getElementById("spanish-table-title-container");
    let tableTitleIcon = document.getElementById("spanish-table-title-icon");
    let tableTitleText = document.getElementById("spanish-table-title-text");

    if (!isTableDeployed) {

      resetTableDeployment();
      await onceTransitionEnds(tableTitleIcon, "faded-out-info-icon", ["faded-in-info-icon"])
        .then(() => tableTitleIcon.classList.add("undisplayed-info-icon"));
      await onceTransitionEnds(tableTitleContainer, "expanded-title-container", []);
      setTimeout(function () {
        tableTitleText.classList.remove("undisplayed-title-text");
        tableTitleText.classList.add("displayed-title-text");
        tableTitleText?.classList.remove("faded-out-title-text");
        tableTitleText.classList.add("faded-in-title-text");
      }, parseFloat(window.getComputedStyle(tableTitleContainer).transitionDuration) * 900);
      isTableDeployed = !isTableDeployed;
    }
  }

  const items = ref(gridItemList);
</script>

<template>
  <div class="main-content-grid-item">
    <div id="spanish-table-title-container" class="table-title-container" @click="deployTable">
      <p id="spanish-table-title-icon" class="faded-in-info-icon displayed-info-icon material-symbols-outlined material-icons md-24">info</p>
      <p id="spanish-table-title-text" class="faded-out-title-text undisplayed-title-text">Frecuencia de las letras en el español</p>
    </div>
    <div id="spanish-table-grid-container" class="table-grid-container">
      <div v-for="item in items" class="grid-item">
        <span class="letter">{{ item.letter }}</span>
        <span class="content">{{ item.content }}%</span>
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
    background-color: var(--base-dark-primary);
    border: 5px solid var(--base-dark-primary);
    border-radius: 2rem;
    color: var(--base-very-light-primary);
    display: flex;
    height: 3rem;
    justify-content: center;
    margin: 0 0 1rem;
    width: 3rem;
  }

  div.expanded-title-container {
    transition: width ease 2s;
    transition-delay: 0.4s;
    width: 100%;
  }

  p.faded-in-info-icon {
    transition: opacity ease 0.3s;
    opacity: 1;
  }

  p.faded-out-info-icon {
    transition: opacity ease 0.3s;
    opacity: 0;
  }

  p.displayed-info-icon {
    display: initial;
  }

  p.undisplayed-info-icon {
    display: none;
  }

  p.faded-out-title-text {
    transition: opacity ease 2s;
    opacity: 0;
  }

  @keyframes text-fade-in {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  p.faded-in-title-text {
    color: var(--base-very-light-primary);
    opacity: 1;
    animation-name: text-fade-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  p.displayed-title-text {
    display: initial;
  }

  p.undisplayed-title-text {
    display: none;
  }

  div p#spanish-table-title-icon {

  }

  div p#spanish-table-title-text {

  }

  /*div.table-title-container:hover {
    width: 100%;
  }

  div.table-title-container:hover p {
    color: var(--base-dark-primary);
  }*/

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
    background: var(--color-mono-table-letters-hover-background);
    border-color: var(--color-mono-table-letters-hover-border);
  }

  .grid-item:hover .content {
    background: var(--color-mono-table-content-hover-background);
    border-color: var(--color-mono-table-content-hover-border);
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

  .material-icons.md-18 {
    font-size: 18px;
  }

  .material-icons.md-24 {
    font-size: 24px;
  }

  .material-icons.md-36 {
    font-size: 36px;
  }

  .material-icons.md-48 {
    font-size: 48px;
  }
</style>