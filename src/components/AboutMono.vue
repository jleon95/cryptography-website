<script setup lang="ts">
  function closeAboutMono() {
    let aboutMono: HTMLElement = document.getElementById("about-mono")!;
    aboutMono.style.setProperty("opacity", window.getComputedStyle(aboutMono).getPropertyValue("opacity"));
    aboutMono.classList.remove("inflate-about-mono-container");
    aboutMono.classList.add("deflate-about-mono-container");
    setTimeout(function () {
      aboutMono.classList.remove("deflate-about-mono-container");
      aboutMono.style.removeProperty("display");
      aboutMono.style.removeProperty("opacity");
    }, 700);
  }
</script>

<template>
  <div id="about-mono" class="about-mono-container">
    <button @click="closeAboutMono" class="close-about-mono-container material-symbols-outlined material-icons md-24">close</button>
  </div>
</template>

<style scoped>
  div.about-mono-container {
    backdrop-filter: blur(0.2rem) sepia(30%);
    background-color: var(--base-very-dark-primary-translucent);
    display: none;
    height: 100vh;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 2;
  }

  button.close-about-mono-container {
    background: var(--base-dark-primary);
    border: 0.2rem solid var(--base-dark-primary);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-weight: 500;
    height: 3rem;
    margin: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 3rem;
    transition: all ease 0.2s;
  }

  button.close-about-mono-container:hover {
    background: var(--base-secondary);
    border-color: var(--base-secondary);
    transform: scale(1.1, 1.1);
  }

  button.close-about-mono-container:active {
    background-color: var(--base-dark-primary);
    border-color: white;
  }

  .material-icons.md-24 {
    font-size: 24px;
  }

  div.inflate-about-mono-container {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-about-mono;
    animation-timing-function: ease;
    display: initial;
  }

  div.deflate-about-mono-container {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-about-mono;
    display: initial;
  }

  @keyframes inflate-about-mono {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes deflate-about-mono {
  from { opacity: 1; }
  to { opacity: 0; }
  }
</style>