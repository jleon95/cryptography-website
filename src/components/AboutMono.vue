<script setup lang="ts">
  import { forEachChild } from "typescript";

  const decryptionExampleMapping = {
    z : "A",
    m: "D",
    t: "H",
    g: "L",
    f: "M",
    x: "N",
    a: "O",
    e: "U",
    ", ": ", "
  }

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

  function resetEncryptionBackgroundMovementAnimation () {

    setTimeout(function () {
      for (let i = 0; i < 24; i++) {
        let encryptedExampleGridElement: HTMLElement = document.getElementById(`cipher-example-${i}`)!;
        encryptedExampleGridElement.classList.remove("from-green-to-blue-background", "from-blue-to-green-background");
      }
    }, 700);
  }

  function resetEncryptionTextAnimation() {

    setTimeout(function () {
      for (const letterContainer of document.getElementById("cipher-example-text")!.children) {
        letterContainer.classList.remove("encrypt-example-letter");
        if (letterContainer.textContent == letterContainer.textContent!.toLowerCase())
          letterContainer.textContent = decryptionExampleMapping[letterContainer.textContent];
      }
    }, 700);
  }

  function animateEncryption(e: Event) {

    let currentOriginalLetter: HTMLElement = (e.currentTarget as HTMLElement);

    if (!currentOriginalLetter.classList.contains("from-green-to-blue-background")) {
      // Animations for green background movements
      let clickedLetterGridPosition: number = +currentOriginalLetter.id.split("-")[2];
      let encryptedLetterGridPosition: number = clickedLetterGridPosition + 16; // Rows in this grid have 8 elements each
      let encryptedLetterElement: HTMLElement = document.getElementById(`cipher-example-${encryptedLetterGridPosition}`)!;
      currentOriginalLetter.classList.add("from-green-to-blue-background");
      encryptedLetterElement.classList.add("from-blue-to-green-background");
      // Animation for text example letter(s)
      let textContainer: HTMLElement = document.getElementById("cipher-example-text")!;
      for (const letterContainer of textContainer.children) {
        if (letterContainer.textContent == currentOriginalLetter.textContent) {
          letterContainer.classList.add("encrypt-example-letter");
          setTimeout(() => letterContainer.textContent = encryptedLetterElement.textContent!.toLowerCase(), 1375);
        }
      }
    }
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
    <div id="text-blob-three-cipher-example-grid">
      <span @click="animateEncryption" id="cipher-example-0" class="cipher-example-grid-item letter original">A</span><span @click="animateEncryption" id="cipher-example-1" class="cipher-example-grid-item letter original">D</span><span @click="animateEncryption" id="cipher-example-2" class="cipher-example-grid-item letter original">H</span><span @click="animateEncryption" id="cipher-example-3" class="cipher-example-grid-item letter original">L</span><span @click="animateEncryption" id="cipher-example-4" class="cipher-example-grid-item letter original">M</span><span @click="animateEncryption" id="cipher-example-5" class="cipher-example-grid-item letter original">N</span><span @click="animateEncryption" id="cipher-example-6" class="cipher-example-grid-item letter original">O</span><span @click="animateEncryption" id="cipher-example-7" class="cipher-example-grid-item letter original">U</span>
      <span id="cipher-example-8" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-9" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-10" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-11" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-12" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-13" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-14" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-15" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span>
      <span id="cipher-example-16" class="cipher-example-grid-item letter encrypted">Z</span><span id="cipher-example-17" class="cipher-example-grid-item letter encrypted">M</span><span id="cipher-example-18" class="cipher-example-grid-item letter encrypted">T</span><span id="cipher-example-19" class="cipher-example-grid-item letter encrypted">G</span><span id="cipher-example-20" class="cipher-example-grid-item letter encrypted">F</span><span id="cipher-example-21" class="cipher-example-grid-item letter encrypted">X</span><span id="cipher-example-22" class="cipher-example-grid-item letter encrypted">A</span><span id="cipher-example-23" class="cipher-example-grid-item letter encrypted">E</span>
    </div>
    <div id="cipher-example-text">
      <span class="cipher-example-letter">H</span><span class="cipher-example-letter">O</span><span class="cipher-example-letter">L</span><span class="cipher-example-letter">A</span><span class="cipher-example-comma">,&nbsp;</span><span class="cipher-example-letter">M</span><span class="cipher-example-letter">U</span><span class="cipher-example-letter">N</span><span class="cipher-example-letter">D</span><span class="cipher-example-letter">O</span>
    </div>
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
    background-color: var(--base-very-dark-primary-translucent);
    display: none;
    grid-column-gap: 2rem;
    grid-template-areas: "one ." ". two" "three .";
    height: 100vh;
    justify-content: center;
    left: 0;
    opacity: 0;
    padding: 3rem 10rem;
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
    height: 3.2rem;
    margin: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    transition: all ease 0.2s;
    width: 3.2rem;
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

  .about-mono-text-blob {
    background: var(--base-dark-primary);
    border: 0.2rem solid var(--base-dark-primary);
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

  #text-blob-three-cipher-example-grid {
    display: grid;
    grid-column-gap: 0.3rem;
    grid-template-columns: repeat(8, auto);
    grid-template-rows: auto auto auto;
    justify-content: center;
    margin: 1.5rem 0 0;
  }

  .cipher-example-grid-item {
    text-align: center;
    padding: 0.4rem;
  }

  .cipher-example-grid-item.letter {
    border: 0.2rem solid white;
    border-radius: 0.5rem;
    height: 3rem;
    width: 3rem;
  }

  .letter.original {
    background-color: var(--base-darker-green);
    cursor: pointer;
  }

  .letter.encrypted {
    background-color: var(--base-darker-primary);
  }

  .cipher-example-grid-item.arrow {
    color: white;
    margin: 0.2rem 0;
  }

  #cipher-example-text {
    border-top: 0.1rem solid white;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: 2rem;
    padding-top: 2rem;
    width: 100%;
  }

  #cipher-example-text .cipher-example-letter, #cipher-example-text .cipher-example-comma {
    background-color: var(--base-darker-primary);
    border: 0.2rem solid white;
    border-radius: 0.5rem;
    height: 3rem;
    margin: 0.15rem;
    padding: 0.4rem;
    text-align: center;
    text-transform: uppercase;
    width: 3rem;
  }

  #cipher-example-text .cipher-example-comma {
    background-color: transparent;
    border: none;
    font-weight: 700;
    padding: 1rem 0.5rem 0 0;
    width: 1.5rem;
  }

  .encrypt-example-letter {
    animation-delay: 1s;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-name: encrypt-letter;
    animation-timing-function: linear;
    background: var(--base-secondary);
  }

  @keyframes encrypt-letter {
    0% {
      transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
    }

    75% {
      background: var(--base-darker-green);
    }

    100% {
      transform: rotateZ(360deg) rotateX(360deg) rotateY(360deg);
      background: var(--base-darker-green);
    }
  }

  .material-icons.md-24 {
    font-size: 24px;
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

  span.original.from-green-to-blue-background {
    animation: gradient-green-to-blue 0.5s linear;
    animation-direction: normal;
    animation-fill-mode: forwards;
    background: linear-gradient(var(--base-darker-primary) 0%, var(--base-darker-primary) 50%, var(--base-darker-green) 50%, var(--base-darker-green) 100%);
    background-position: 0% 0%;
    background-size: 100% 200%;
    cursor: default;
  }

  span.from-blue-to-green-background {
    animation: gradient-green-to-blue 0.5s linear;
    animation-delay: 0.5s;
    animation-direction: normal;
    animation-fill-mode: forwards;
    background: linear-gradient(var(--base-darker-green) 0%, var(--base-darker-green) 50%, var(--base-darker-primary) 50%, var(--base-darker-primary) 100%);
    background-position: 0% 100%;
    background-size: 100% 200%;
  }

  @keyframes gradient-green-to-blue {
    0% { background-position: 0% 100%; }
    100% { background-position: 0% 0%; }
  }
</style>