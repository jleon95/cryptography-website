﻿<script setup lang="ts">
  import EncryptionExample from './EncryptionExample.vue';
</script>

<template>
  <div id="about-mono-first-page">
    <div class="page-indicator">
      1/2
    </div>
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
    <div class="about-mono-text-blob" id="text-blob-four">
      La clave para descifrar mensajes cifrados con este método es tener en cuenta las frecuencias de las letras de un determinado idioma,
      ya que unas se utilizan comparativamente mucho más que otras. Si bien <b>no hay una correspondencia exacta</b> entre el conjunto del idioma y un texto en particular,
      esto suele dar un punto de partida con el que empezar a identificar patrones.
    </div>
  </div>
</template>

<style scoped>
  b {
    font-weight: 700;
  }

  #about-mono-first-page {
    display: grid;
    grid-column-gap: 2rem;
    grid-template-areas: "one ." ". two" "three ." ". four";
    justify-content: center;
    padding: 2rem;
    width: 50%;
  }

  .page-indicator {
    align-items: center;
    background: var(--color-aboutthis-page-indicator-background);
    border-radius: 2rem;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    color: var(--color-aboutthis-page-indicator-text);
    display: flex;
    height: 2rem;
    justify-content: center;
    left: 3vw;
    position: absolute;
    top: 3vh;
    width: 3.5rem;
  }

  .about-mono-text-blob {
    background: var(--color-aboutthis-first-page-blob-background);
    border: 0.2rem solid var(--color-aboutthis-first-page-blob-border);
    border-radius: 2rem;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    color: var(--color-aboutthis-first-page-blob-text);
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

  #text-blob-four {
    grid-area: four;
  }
</style>