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

  const items = ref(gridItemList);

  /* Start table deployment code */

  function resetTableDeployment() {

    let tableTitleContainer = document.getElementById("spanish-table-title-container")!;
    let tableTitleIcon = document.getElementById("spanish-table-title-icon")!;
    let tableTitleText = document.getElementById("spanish-table-title-text")!;
    let tableGridContainer = document.getElementById("spanish-table-grid-container")!;

    tableTitleContainer.style.setProperty("width", window.getComputedStyle(tableTitleContainer).getPropertyValue("width"));
    tableTitleContainer.classList.remove("expand-title-container", "shrink-title-container");

    tableTitleIcon.style.setProperty("opacity", window.getComputedStyle(tableTitleIcon).getPropertyValue("opacity"));
    tableTitleIcon.classList.remove("fade-in-info-icon", "fade-out-info-icon");

    tableTitleText.style.setProperty("opacity", window.getComputedStyle(tableTitleText).getPropertyValue("opacity"));
    tableTitleText.classList.remove("fade-in-title-text", "fade-out-title-text");

    tableGridContainer.style.setProperty("opacity", window.getComputedStyle(tableGridContainer).getPropertyValue("opacity"));
    tableGridContainer.classList.remove("inflate-table-grid", "deflate-table-grid");
  }

  function deployTable() {

    let tableTitleContainer = document.getElementById("spanish-table-title-container")!;
    tableTitleContainer.removeEventListener("click", deployTable);
    let tableTitleIcon = document.getElementById("spanish-table-title-icon")!;
    let tableTitleText = document.getElementById("spanish-table-title-text")!;
    let tableGridContainer = document.getElementById("spanish-table-grid-container")!;

    let waitAndChangeProperty = (element: HTMLElement, property: string, newValue: string, time: number) => { setTimeout(() => element.style.setProperty(property, newValue), time) };

    if (!isTableDeployed) {

      resetTableDeployment();

      tableTitleIcon.classList.add("fade-out-info-icon");
      let fadeOutTableIconDuration: number = parseFloat(window.getComputedStyle(tableTitleIcon).getPropertyValue("animation-duration"));
      waitAndChangeProperty(tableTitleIcon, "display", "none", fadeOutTableIconDuration * 1000);

      tableTitleContainer.classList.add("expand-title-container");
      let expandTableTitleContainerDuration: number = parseFloat(window.getComputedStyle(tableTitleContainer).getPropertyValue("animation-duration"))
        + parseFloat(window.getComputedStyle(tableTitleContainer).getPropertyValue("animation-delay"));
      waitAndChangeProperty(tableTitleText, "display", "initial", expandTableTitleContainerDuration * 1000);

      tableTitleText.classList.add("fade-in-title-text");
      let fadeInTitleTextDuration: number = parseFloat(window.getComputedStyle(tableTitleText).getPropertyValue("animation-duration")) + expandTableTitleContainerDuration;
      setTimeout(() => tableGridContainer.classList.add("inflate-table-grid"), fadeInTitleTextDuration * 1000);

      isTableDeployed = !isTableDeployed;
      setTimeout(() => tableTitleContainer?.addEventListener("click", deployTable), (expandTableTitleContainerDuration + fadeInTitleTextDuration) * 1000);
    }
    else {

      // The elements keep the last animation frame as their new style (animation-fill-mode: forwards), but if you remove the animation class the style is gone.
      // So, extract the relevant style from the class and then delete it safely.
      let reverseElementAnimation = (element: HTMLElement, animatedProperty: string, oldAnimationClass: string, newAnimationClass: string) => {
        element.style.setProperty(animatedProperty, window.getComputedStyle(element).getPropertyValue(animatedProperty));
        element.classList.remove(oldAnimationClass);
        element.classList.add(newAnimationClass);
      };

      reverseElementAnimation(tableGridContainer, "opacity", "inflate-table-grid", "deflate-table-grid");
      let fadeOutTableGridDuration: number = parseFloat(window.getComputedStyle(tableGridContainer).getPropertyValue("animation-duration"));

      reverseElementAnimation(tableTitleText, "opacity", "fade-in-title-text", "fade-out-title-text");
      let fadeOutTitleTextDuration: number = parseFloat(window.getComputedStyle(tableTitleText).getPropertyValue("animation-delay"));
      waitAndChangeProperty(tableTitleText, "display", "none", (fadeOutTableGridDuration + fadeOutTitleTextDuration) * 1000);

      reverseElementAnimation(tableTitleContainer, "width", "expand-title-container", "shrink-title-container")
      let shrinkTableTitleContainerDuration: number = parseFloat(window.getComputedStyle(tableTitleContainer).getPropertyValue("animation-duration"))
        + parseFloat(window.getComputedStyle(tableTitleContainer).getPropertyValue("animation-delay"));
      waitAndChangeProperty(tableTitleIcon, "display", "initial", shrinkTableTitleContainerDuration * 1000);

      reverseElementAnimation(tableTitleIcon, "opacity", "fade-out-info-icon", "fade-in-info-icon");

      isTableDeployed = !isTableDeployed;
      setTimeout(() => tableTitleContainer?.addEventListener("click", deployTable), (fadeOutTitleTextDuration + shrinkTableTitleContainerDuration) * 1000);
    }
  }

  /* End table deployment code */
</script>

<template>
  <div class="main-content-grid-item">
    <div id="spanish-table-title-container" class="table-title-container" @click.once="deployTable">
      <p id="spanish-table-title-icon" class="material-symbols-outlined material-icons md-24">info</p>
      <p id="spanish-table-title-text">Frecuencia de las letras en el idioma español</p>
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

  /* General initial state */
  .main-content-grid-item {
    display: flex;
    flex-direction: column;
    padding: 1% 4% 2% 10%;
  }

  div.table-title-container {
    align-items: center;
    background-color: var(--color-mono-table-title-background);
    border: 5px solid var(--color-mono-table-title-border);
    border-radius: 2rem;
    color: var(--color-mono-table-title-text);
    cursor: pointer;
    display: flex;
    height: 3rem;
    justify-content: center;
    margin: 0 0 1rem;
    transition: background-color ease 0.2s, border-color ease 0.2s;
    width: 3rem;
  }

  div.table-title-container:hover {
    background-color: var(--color-mono-table-title-clickable-hover-background);
    border-color: var(--color-mono-table-title-clickable-hover-border);
  }

  p#spanish-table-title-text {
    display: none;
    opacity: 0;
    position: relative;
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

  /* Table grid */

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

  /* Table animation classes and keyframes */

  div.expand-title-container {
    animation-delay: 0.4s;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
    animation-name: title-container-expand;
    animation-timing-function: ease-out;
  }

  div.shrink-title-container {
    animation-delay: 1.6s;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
    animation-name: title-container-shrink;
    animation-timing-function: ease-out;
  }

  div.inflate-table-grid {
    animation-delay: 0.2s;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-name: table-inflate;
    animation-timing-function: ease-out;
  }

  div.deflate-table-grid {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-name: table-deflate;
    animation-timing-function: ease-out;
  }

  p.fade-in-info-icon {
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-name: icon-fade-in;
    animation-timing-function: ease;
  }

  p.fade-out-info-icon {
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-name: icon-fade-out;
    animation-timing-function: ease-out;
  }

  p.fade-out-title-text {
    animation-delay: 1s;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-name: text-fade-out;
    animation-timing-function: ease-out;
  }

  p.fade-in-title-text {
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-name: text-fade-in;
    animation-timing-function: ease-out;
  }

  @keyframes icon-fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes icon-fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes text-fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes text-fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes title-container-expand {
    from {
      width: 3rem;
    }

    to {
      width: 100%;
    }
  }

  @keyframes title-container-shrink {
    from {
      width: 100%;
    }

    to {
      width: 3rem;
    }
  }

  @keyframes table-inflate {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes table-deflate {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  /* Icon that deploys the table */

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 40;
  }

  .material-icons.md-24 {
    font-size: 24px;
  }
</style>