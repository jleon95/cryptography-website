<script setup lang="ts">
  import AboutMonoFirstPage from './AboutMonoFirstPage.vue';
  import AboutMonoSecondPage from './AboutMonoSecondPage.vue';
  import { goLeft, goRight } from '../../../composables/Monoalphabetic/AboutMono/navigateAboutMono';
  import { closeAboutMono } from '../../../composables/Monoalphabetic/AboutMono/closeAboutMono';

</script>

<template>
  <button id="about-mono-go-left" @click="goLeft" class="disabled go-left-about-mono-container material-symbols-outlined material-icons md-24">chevron_left</button>
  <button id="about-mono-go-right" @click="goRight" class="go-right-about-mono-container material-symbols-outlined material-icons md-24">chevron_right</button>
  <button id="about-mono-close" @click="closeAboutMono" class="close-about-mono-container material-symbols-outlined material-icons md-24">close</button>
  <div id="about-mono" class="about-mono-container">
    <AboutMonoFirstPage />
    <AboutMonoSecondPage />
  </div>
</template>

<style scoped>
  div.about-mono-container {
    align-items: flex-start;
    backdrop-filter: blur(0.2rem) sepia(30%);
    background-color: var(--color-aboutthis-general-background);
    display: none;
    height: 100vh;
    justify-content: space-between;
    left: 0%;
    opacity: 0;
    position: fixed;
    top: 0;
    width: 200%;
    z-index: 2;
  }

  button {
    align-items: center;
    background: var(--color-aboutthis-close-background);
    border: 0.2rem solid var(--color-aboutthis-close-border);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: none;
    font-weight: 500;
    height: 3.2rem;
    justify-content: center;
    transition: all ease 0.2s;
    width: 3.2rem;
    z-index: 3;
  }

  button:hover {
    background: var(--color-aboutthis-close-hover-background);
    border-color: var(--color-aboutthis-close-hover-border);
  }

  button:active {
    background-color: var(--color-aboutthis-close-active-background);
    border-color: var(--color-aboutthis-close-active-border);
  }

  button.go-left-about-mono-container {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 50%;
    left: 3%;
    transform: translate(0%, -50%);
  }

  button.go-right-about-mono-container {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 50%;
    right: 3%;
    transform: translate(0%, -50%);
  }

  button.close-about-mono-container {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    position: fixed;
    right: 3vw;
    top: 3vh;
  }

  button.go-left-about-mono-container.disabled,
  button.go-right-about-mono-container.disabled {
    background-color: var(--color-disabled-button);
    border-color: var(--color-disabled-button);
    pointer-events: none;
  }

  div.inflate-about-mono-container,
  button.inflate {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-about-mono;
    animation-timing-function: ease;
    display: flex;
  }

  div.deflate-about-mono-container,
  button.deflate {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-about-mono;
    display: flex;
  }

  @keyframes inflate-about-mono {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes deflate-about-mono {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  div.go-right-about-mono-container {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: go-right-about-mono-container;
    animation-timing-function: ease;
  }

  @keyframes go-right-about-mono-container {
    from { left: 0%; }
    to { left: -100%; }
  }

  div.go-left-about-mono-container {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: go-left-about-mono-container;
    animation-timing-function: ease;
  }

  @keyframes go-left-about-mono-container {
    from { left: -100%; }
    to { left: 0%; }
  }
</style>