<script setup lang="ts">
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
  <div id="text-blob-three-cipher-example-grid">
    <span @click="animateEncryption" id="cipher-example-0" class="cipher-example-grid-item letter original">A</span><span @click="animateEncryption" id="cipher-example-1" class="cipher-example-grid-item letter original">D</span><span @click="animateEncryption" id="cipher-example-2" class="cipher-example-grid-item letter original">H</span><span @click="animateEncryption" id="cipher-example-3" class="cipher-example-grid-item letter original">L</span><span @click="animateEncryption" id="cipher-example-4" class="cipher-example-grid-item letter original">M</span><span @click="animateEncryption" id="cipher-example-5" class="cipher-example-grid-item letter original">N</span><span @click="animateEncryption" id="cipher-example-6" class="cipher-example-grid-item letter original">O</span><span @click="animateEncryption" id="cipher-example-7" class="cipher-example-grid-item letter original">U</span>
    <span id="cipher-example-8" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-9" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-10" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-11" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-12" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-13" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-14" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span><span id="cipher-example-15" class="cipher-example-grid-item arrow material-symbols-outlined material-icons md-24">arrow_downward</span>
    <span id="cipher-example-16" class="cipher-example-grid-item letter encrypted">Z</span><span id="cipher-example-17" class="cipher-example-grid-item letter encrypted">M</span><span id="cipher-example-18" class="cipher-example-grid-item letter encrypted">T</span><span id="cipher-example-19" class="cipher-example-grid-item letter encrypted">G</span><span id="cipher-example-20" class="cipher-example-grid-item letter encrypted">F</span><span id="cipher-example-21" class="cipher-example-grid-item letter encrypted">X</span><span id="cipher-example-22" class="cipher-example-grid-item letter encrypted">A</span><span id="cipher-example-23" class="cipher-example-grid-item letter encrypted">E</span>
  </div>
  <div id="cipher-example-text">
    <span class="cipher-example-letter">H</span><span class="cipher-example-letter">O</span><span class="cipher-example-letter">L</span><span class="cipher-example-letter">A</span><span class="cipher-example-comma">,&nbsp;</span><span class="cipher-example-letter">M</span><span class="cipher-example-letter">U</span><span class="cipher-example-letter">N</span><span class="cipher-example-letter">D</span><span class="cipher-example-letter">O</span>
  </div>
</template>

<style scoped>
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
    background-color: var(--color-aboutthis-example-highlighted-letter-background);
    cursor: pointer;
  }

  .letter.encrypted {
    background-color: var(--color-aboutthis-example-default-letter-background);
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
    background-color: var(--color-aboutthis-example-default-letter-background);
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
  }

  @keyframes encrypt-letter {
    0% { transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg); }
    75% { background: var(--color-aboutthis-example-highlighted-letter-background); }
    100% {
      transform: rotateZ(360deg) rotateX(360deg) rotateY(360deg);
      background: var(--color-aboutthis-example-highlighted-letter-background);
    }
  }

  span.original.from-green-to-blue-background {
    animation: gradient-green-to-blue 0.5s linear;
    animation-direction: normal;
    animation-fill-mode: forwards;
    background: linear-gradient(var(--color-aboutthis-example-default-letter-background) 0%, 
                                var(--color-aboutthis-example-default-letter-background) 50%, 
                                var(--color-aboutthis-example-highlighted-letter-background) 50%, 
                                var(--color-aboutthis-example-highlighted-letter-background) 100%);
    background-position: 0% 0%;
    background-size: 100% 200%;
    cursor: default;
  }

  span.from-blue-to-green-background {
    animation: gradient-green-to-blue 0.5s linear;
    animation-delay: 0.5s;
    animation-direction: normal;
    animation-fill-mode: forwards;
    background: linear-gradient(var(--color-aboutthis-example-highlighted-letter-background) 0%, 
                                var(--color-aboutthis-example-highlighted-letter-background) 50%, 
                                var(--color-aboutthis-example-default-letter-background) 50%, 
                                var(--color-aboutthis-example-default-letter-background) 100%);
    background-position: 0% 100%;
    background-size: 100% 200%;
  }

  @keyframes gradient-green-to-blue {
    from { background-position: 0% 100%; }
    to { background-position: 0% 0%; }
  }

  .material-icons.md-24 {
    font-size: 24px;
  }
</style>