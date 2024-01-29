<template>
  <div class="navbar-wrapper">
    <div class="tooltip">
      <a class="material-symbols-outlined material-icons md-24" href="#">home</a>
      <span class="tooltiptext">Inicio</span>
    </div>
    <div class="tooltip">
      <a class="material-symbols-outlined material-icons md-24" href="#">swap_horiz</a>
      <span class="tooltiptext">Cifrado monoalfabético</span>
    </div>
    <div class="tooltip">
      <a class="material-symbols-outlined material-icons md-24" href="#">donut_large</a>
      <span class="tooltiptext">Cifrado por transposición</span>
    </div>
  </div>
</template>

<style scoped>
  .navbar-wrapper {
    align-items: center;
    background: linear-gradient(var(--color-navbar-first-background) 0%, var(--color-navbar-first-background) 80%, var(--color-navbar-second-background) 80%, var(--color-navbar-second-background) 100%);
    background-color: var(--color-navbar-background);
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  .navbar-wrapper a {
    background: var(--color-navbar-button-background);
    border: 0.4rem solid var(--color-navbar-button-border);
    border-radius: 50%;
    color: var(--color-navbar-button-text);
    font-size: var(--navbar-base-font-size);
    font-weight: var(--navbar-base-font-weight);
    margin: 0 0.4rem;
    outline-offset: -1px;
    padding: 1rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: all ease 0.5s;
  }

  .navbar-wrapper a:hover {
    background: var(--color-navbar-button-hover-background);
    border-color: var(--color-navbar-button-hover-border);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    transform: translate(0, 7%) rotate(360deg);
  }

  .tooltip {
    position: relative;
  }

  .tooltip .tooltiptext {
    background-color: transparent;
    border-radius: 0.5rem;
    color: transparent;
    display: inline-block;
    left: 50%;
    padding: 0.5rem 1rem;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, 105%);
    transition: background-color ease 0.6s, color ease 0.6s;
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
    top: 0;
    transform: translate(-50%, -100%);
    transition: border-color ease 0.6s;
  }

  .tooltip:hover .tooltiptext {
    background-color: var(--color-navbar-button-tooltip-background);
    color: var(--color-navbar-button-tooltip-text);
    visibility: visible;
  }

  .tooltip:hover .tooltiptext::after {
    border-color: transparent transparent var(--color-navbar-button-tooltip-border) transparent;
    visibility: visible;
  }

  .navbar-wrapper a:active {
    background-color: var(--base-dark-primary);
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 40;
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