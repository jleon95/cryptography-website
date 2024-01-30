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

  function deployTable() {

    let tableTitleContainer = document.getElementById("spanish-table-title-container");
    let tableTitleIcon = document.getElementById("spanish-table-title-icon");
    let tableTitleText = document.getElementById("spanish-table-title-text");
    let tableGridContainer = document.getElementById("spanish-table-grid-container");

    if (!isTableDeployed) {

      //resetTableDeployment();
      tableTitleIcon?.classList.add("fade-out-info-icon");
      let fadeOutTableIconDuration: number = parseFloat(window.getComputedStyle(tableTitleIcon).animationDuration);
      setTimeout(() => tableTitleIcon.style.display = "none", fadeOutTableIconDuration * 1000);
      tableTitleContainer?.classList.add("expand-title-container");
      let expandTableTitleContainerDuration: number = parseFloat(window.getComputedStyle(tableTitleContainer).animationDuration)
        + parseFloat(window.getComputedStyle(tableTitleContainer).animationDelay);
      setTimeout(() => tableTitleText.style.display = "initial", expandTableTitleContainerDuration * 1000);
      tableTitleText?.classList.add("fade-in-title-text");
      let fadeInTitleTextDuration: number = parseFloat(window.getComputedStyle(tableTitleText).animationDuration) + expandTableTitleContainerDuration;
      setTimeout(() => tableGridContainer.classList.add("inflate-table-grid"), fadeInTitleTextDuration * 1000);

      isTableDeployed = !isTableDeployed;
    }
    else {

      isTableDeployed = !isTableDeployed;
    }
  }

  const items = ref(gridItemList);
</script>

<template>
  <div class="main-content-grid-item">
    <div id="spanish-table-title-container" class="table-title-container" @click="deployTable">
      <p id="spanish-table-title-icon" class="material-symbols-outlined material-icons md-24">info</p>
      <p id="spanish-table-title-text">Frecuencia de las letras en el español</p>
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
    cursor: pointer;
  }

  div.table-title-container:hover {
    background-color: var(--base-darker-primary);
    border-color: var(--base-darker-primary);
    transition: background-color 0.2s, border-color 0.2s;
  }

  p#spanish-table-title-text {
    display: none;
    opacity: 0;
  }

  div.expand-title-container {
    animation-name: title-container-expand;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    animation-delay: 0.4s;
  }

  div.inflate-table-grid {
    animation-name: table-inflate;
    animation-duration: 1s;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }

  p.fade-in-info-icon {
    animation-name: icon-fade-in;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }

  p.fade-out-info-icon {
    animation-name: icon-fade-out;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }

  p.fade-out-title-text {
    animation-name: text-fade-out;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }

  p.fade-in-title-text {
    animation-name: text-fade-in;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }

  div.table-title-container p {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }

  div.table-grid-container {
    display: grid;
    grid-template-columns: repeat(9, 11.11111%);
    opacity: 0;
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

   @keyframes icon-fade-out {
    from {opacity: 1;}
    to {opacity: 0;}
  }

   @keyframes icon-fade-in {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes text-fade-in {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes text-fade-out {
  from {opacity: 1;}
  to {opacity: 0;}
}

  @keyframes title-container-expand {
    from {width: 3rem;}
    to {width: 100%;}
  }

  @keyframes title-container-shrink {
  from {width: 100%;}
  to {width: 3rem;}
}

  @keyframes table-inflate {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes table-deflate {
    from {opacity: 1;}
    to {opacity: 0;}
  }
</style>