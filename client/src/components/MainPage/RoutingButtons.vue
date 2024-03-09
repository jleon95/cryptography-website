<script setup lang="ts">
  import RoutingButton from './RoutingButton.vue';
</script>

<template>
  <div class="main">
    <div class="container">
      <RoutingButton icon="swap_horiz" tooltip-position="above" tooltip="Cifrado monoalfabético" state="" path="/monoalphabetic" />
      <RoutingButton icon="donut_large" tooltip-position="above" tooltip="Cifrado por transposición" state="disabled" path="" />
      <RoutingButton icon="question_mark" tooltip-position="below" tooltip="Acerca de esta página" state="" path="" />
    </div>
  </div>
</template>

<style scoped>
  /* Source: https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/ */
  .main {
    display: flex;
    filter: drop-shadow(0 8px 6px rgba(0, 0, 0, 0.5));
    max-width: 180px;
    --f: calc(var(--s) * 1.732 + 4 * var(--m) - 1px);
    --m: 5px; /* margin */
    --s: 80px; /* size  */
  }

  .container {
    font-size: 0; /* disable white space between inline block element */
  }

  .container::before {
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