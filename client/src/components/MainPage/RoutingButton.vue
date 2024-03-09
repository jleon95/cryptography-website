<script setup lang="ts">
  defineProps<{
    icon: string,
    tooltipPosition: string,
    tooltip: string,
    path: string,
    state: string
  }>()
</script>

<template>
  <router-link class="tooltip" :class="state" :to="{path: path}">
    <span class="icon material-symbols-outlined material-icons md-28">{{ icon }}</span>
    <span class="tooltiptext" :class="tooltipPosition">{{ tooltip }}</span>
  </router-link>
</template>

<style scoped>
  a { /*<router-link> is converted to <a>*/
    cursor: default;
    text-decoration: none;
  }

  .tooltip {
    align-items: center;
    display: inline-flex;
    font-size: initial;
    justify-content: center;
    margin: var(--m);
    margin-bottom: calc(var(--m) - var(--s) * 0.2885);
    position: relative;
  }

  .icon {
    align-items: center;
    background-color: var(--color-mainpage-button-background);
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    color: var(--color-mainpage-button-text);
    cursor: pointer;
    display: inline-flex;
    height: calc(var(--s) * 1.1547);
    justify-content: center;
    width: var(--s);
    transition: all ease 0.5s;
  }

  .icon:hover {
    background-color: var(--color-mainpage-button-hover-background);
    transform: rotate(360deg);
  }

  .icon:active {
    background-color: var(--color-mainpage-button-active-background);
  }

  .tooltip.disabled {
    pointer-events: none;
  }

  .tooltip.disabled > .icon {
    background-color: var(--color-disabled-button);
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
    transition: background-color ease 0.6s, color ease 0.6s;
    transition-delay: 1s;
    visibility: hidden;
    white-space: nowrap;
    z-index: 1;
  }

  .tooltiptext.above {
    top: -60%;
    transform: translate(-50%, 0);
  }

  .tooltiptext.below {
    bottom: -60%;
    transform: translate(-50%, 0);
  }

  .tooltiptext::after {
    border-color: transparent transparent transparent transparent;
    border-style: solid;
    border-width: 0.4rem;
    content: "";
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0%);
    transition: border-color ease 0.6s;
    transition-delay: 1s;
  }

  .tooltiptext.above::after {
    top: 100%;
  }

  .tooltiptext.below::after {
    bottom: 100%;
  }

  .tooltip:hover .tooltiptext {
    background-color: var(--color-mainpage-button-tooltip-background);
    color: var(--color-mainpage-button-tooltip-text);
    visibility: visible;
  }

  .tooltip:hover .above::after {
    border-color: var(--color-mainpage-button-tooltip-border) transparent transparent transparent;
    visibility: visible;
  }

  .tooltip:hover .below::after {
    border-color: transparent transparent var(--color-mainpage-button-tooltip-border) transparent;
    visibility: visible;
  }
</style>