<script setup lang="ts">
  import RoutingButton from './RoutingButton.vue';
  import AboutThis from './AboutThis.vue';
  import { resetAnimationsOfElement } from '../../composables/Monoalphabetic/utils';

  function deployAboutThis() {
    const aboutThisWebPage: HTMLElement = document.getElementById("about-this-webpage")!;
    const aboutThisWebPageText: HTMLElement = document.getElementById("about-this-webpage-text")!;
    resetAnimationsOfElement(aboutThisWebPage, "deploy-about-this-webpage", "deploy-about-this-webpage");
    resetAnimationsOfElement(aboutThisWebPageText, "deploy-about-this-webpage-text", "deploy-about-this-webpage-text");
    setTimeout(() => {
      resetAnimationsOfElement(aboutThisWebPage, "deploy-about-this-webpage");
      resetAnimationsOfElement(aboutThisWebPageText, "deploy-about-this-webpage-text");
    }, 15500);
  }
</script>

<template>
  <div class="content">
    <div class="hexagon-grid">
      <div class="button-container">
        <RoutingButton icon="swap_horiz" tooltip-position="above" tooltip="Cifrado monoalfabético" state="" path="/monoalphabetic" />
        <RoutingButton icon="donut_large" tooltip-position="above" tooltip="Cifrado por transposición" state="disabled" path="" />
        <RoutingButton @click="deployAboutThis" icon="question_mark" tooltip-position="below" tooltip="Acerca de esta página" state="" path="" />
      </div>
    </div>
    <AboutThis />
  </div>
</template>

<style scoped>
  .content {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  /* Source: https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/ */
  .hexagon-grid {
    display: flex;
    filter: drop-shadow(0 8px 6px rgba(0, 0, 0, 0.5));
    max-width: 180px;
    --f: calc(var(--s) * 1.732 + 4 * var(--m) - 1px);
    --m: 5px; /* margin */
    --s: 80px; /* size  */
  }

  .button-container {
    font-size: 0; /* disable white space between inline block element */
  }

  .button-container::before {
    content: "";
    float: left;
    height: 120%;
    shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 3px), #000 0 var(--f));
    width: calc(var(--s) / 2 + var(--m));
  }

  .material-icons.md-28 {
    font-size: 28px;
  }
</style>