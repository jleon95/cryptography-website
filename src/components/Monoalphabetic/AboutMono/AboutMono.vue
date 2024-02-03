<script setup lang="ts">
  import { ref } from 'vue';
  import EncryptionExample from './EncryptionExample.vue';

  function closeAboutMono() {
    resetAndCloseAboutMonoContainer();
    resetEncryptionBackgroundMovementAnimation();
    resetEncryptionTextAnimation();
  }

  function resetAndCloseAboutMonoContainer() {

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
  // The following code should semantically be in EncryptionExample, but I couldn't find a way to have it there and then import it here
  function resetEncryptionBackgroundMovementAnimation () {

    setTimeout(function () {
      for (let i = 0; i < 24; i++) {
        let encryptedExampleGridElement: HTMLElement = document.getElementById(`cipher-example-${i}`)!;
        encryptedExampleGridElement.classList.remove("from-green-to-blue-background", "from-blue-to-green-background");
      }
    }, 700);
  }

  function resetEncryptionTextAnimation () {
    const decryptionExampleMapping = {
      z: "A",
      m: "D",
      t: "H",
      g: "L",
      f: "M",
      x: "N",
      a: "O",
      e: "U",
    }
    setTimeout(function () {
      for (const letterContainer of document.getElementById("cipher-example-text")!.children) {
        letterContainer.classList.remove("encrypt-example-letter");
        if (letterContainer.textContent == letterContainer.textContent!.toLowerCase() && decryptionExampleMapping.hasOwnProperty(letterContainer.textContent)) {
          letterContainer.textContent = decryptionExampleMapping[letterContainer.textContent];
        }
      }
    }, 700);
  }
</script>

<template>
  <div id="about-mono" class="about-mono-container">
    <button @click="closeAboutMono" class="close-about-mono-container material-symbols-outlined material-icons md-24">close</button>
  <div class="about-mono-text-blob" id="text-blob-one">
    <p>El <b>cifrado por sustitución</b> consiste en cambiar los caracteres dentro del mensaje original por otros distintos.</p>
  </div>
  <div class="about-mono-text-blob" id="text-blob-two">
    <p>
      El <b>cifrado monoalfabético</b> es un tipo de cifrado por sustitución que consiste en reordenar el alfabeto de forma que
      cada letra sea reemplazada en el mensaje por otra letra, pero siempre la misma.
    </p>
  </div>
  <div class="about-mono-text-blob" id="text-blob-three">
    <p>Veamos un ejemplo. Haz clic en las letras de la primera fila para encriptar el mensaje:</p>
    <EncryptionExample />
  </div>
  </div>
</template>

<style scoped>
  b {
    font-weight: 700;
  }

  div.about-mono-container {
    align-items: center;
    backdrop-filter: blur(0.2rem) sepia(30%);
    background-color: var(--color-aboutthis-general-background);
    display: none;
    grid-column-gap: 2rem;
    grid-template-areas: "one ." ". two" "three .";
    height: 100vh;
    justify-content: center;
    left: 0;
    opacity: 0;
    padding: 2rem 10rem;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 2;
  }

  button.close-about-mono-container {
    background: var(--color-aboutthis-close-background);
    border: 0.2rem solid var(--color-aboutthis-close-border);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-weight: 500;
    height: 3.2rem;
    margin: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    transition: all ease 0.2s;
    width: 3.2rem;
  }

  button.close-about-mono-container:hover {
    background: var(--color-aboutthis-close-hover-background);
    border-color: var(--color-aboutthis-close-hover-border);
    transform: scale(1.1, 1.1);
  }

  button.close-about-mono-container:active {
    background-color: var(--color-aboutthis-close-active-background);
    border-color: var(--color-aboutthis-close-active-border);
  }

  .about-mono-text-blob {
    background: var(--color-aboutthis-blob-background);
    border: 0.2rem solid var(--color-aboutthis-blob-border);
    border-radius: 2rem;
    color: white;
    height: fit-content;
    max-width: 35rem;
    padding: 2rem;
    text-align: justify;
    word-wrap: anywhere;
  }

  #text-blob-one {
    grid-area: one;
  }

  #text-blob-two {
    grid-area: two;
  }

  #text-blob-three {
    grid-area: three;
  }

  div.inflate-about-mono-container {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: inflate-about-mono;
    animation-timing-function: ease;
    display: grid;
  }

  div.deflate-about-mono-container {
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-name: deflate-about-mono;
    display: grid;
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