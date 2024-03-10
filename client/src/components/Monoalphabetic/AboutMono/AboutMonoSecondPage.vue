<script setup lang="ts">
  import EncryptionExample from './EncryptionExample.vue';
</script>

<template>
  <div id="about-mono-second-page">
    <div class="page-indicator">
      2/2
    </div>
    <div class="help-flex-row">
      <div class="wide-help-blob">
        <h3 class="how-to-play-title"><b>Cómo jugar</b></h3>
        <div class="how-to-play-text">
          <p>El juego consiste en descifrar un texto encriptado mediante cifrado monoalfabético.</p>
          <ul style="list-style-type: square">
            <li><b>C1</b> - Muestra el texto encriptado original.</li>
            <li><b>C2</b> - Inicialmente idéntico a <b>C1</b>. Cambia al intercambiar letras mediante <b>T2</b>.</li>
            <li><b>T1</b> - Contiene las frecuencias de aparición de las letras en el texto encriptado.</li>
            <li><b>T2</b> - Las letras del texto sustituidas aquí por otras minúsculas se reflejarán en <b>C2</b>.</li>
            <li><b>T3</b> - Muestra las frecuencias de aparición de las letras en el idioma español.</li>
          </ul>
        </div>
        <div class="how-to-play-diagram">
          <span class="diagram-title">Distribución:</span>
          <span class="diagram-element">C1</span>
          <span class="diagram-element">C2</span>
          <span class="diagram-element">T1</span>
          <span class="diagram-element">T2</span>
          <span class="diagram-element">T3</span>
        </div>
      </div>
    </div>
    <div class="help-flex-row">
      <div class="help-blob">
        <span class="button-help-text">
          Usa este botón para validar las letras no confirmadas (no asignadas o evaluadas previamente como incorrectas).
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">done_all</span>
      </div>
      <div class="help-blob">
        <span class="button-help-text">
          Usa este botón para solicitar una pista que confirmará una letra al azar dando mayor probabilidad a las más frecuentes.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">search</span>
      </div>
      <div class="help-blob">
        <span class="button-help-text">
          Usa este botón para reiniciar la asignación de letras de la partida actual. Se mantendrán las letras ya confirmadas.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">restart_alt</span>
      </div>
      <div class="help-blob">
        <span class="button-help-text">
          Usa este botón para mostrar el texto original sin encriptar. <b>Esto finalizará la partida</b>.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">grading</span>
      </div>
    </div>
    <div class="help-flex-row">
      <div class="help-blob">
        <span class="button-help-text">
          Usa este botón para empezar una nueva partida. Se mantendrán las opciones de formato del texto activas actualmente.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">add</span>
      </div>
      <div class="help-blob">
        <span class="button-help-text">
          Usa este botón para cambiar las opciones de formato del texto (mantener espacios y/o signos de puntuación).
        </span>
        <span class="page-icon material-symbols-outlined material-icons md-24">settings</span>
      </div>
      <div class="help-blob">
        <span class="button-help-text">
          Usa este botón para desplegar la tabla de frecuencias de las letras en el idioma español.
        </span>
        <span class="page-icon material-symbols-outlined material-icons md-24">info</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  b {
    font-weight: 700;
  }

  #about-mono-second-page {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2rem 0;
    justify-content: space-between;
    min-height: 100vh;
    padding: 2% 1%;
    width: 50%;
    position: relative;
  }

  .page-indicator {
    align-items: center;
    background: var(--color-aboutthis-blob-background);
    border-radius: 2rem;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    color: white;
    display: flex;
    height: 2rem;
    justify-content: center;
    left: 3vw;
    position: absolute;
    top: 3vh;
    width: 3.5rem;
  }

  .help-flex-row {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .help-blob,
  .wide-help-blob {
    align-items: center;
    background: var(--color-aboutthis-blob-background);
    border: 0.2rem solid var(--color-aboutthis-blob-border);
    border-radius: 2rem;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    color: white;
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin: 0 1rem;
    padding: 2rem;
    text-align: justify;
  }

  .help-blob {
    max-width: 23rem;
  }

  .wide-help-blob {
    display: grid;
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
    grid-template-columns: 77% 23%;
    justify-content: center;
    padding: 1.5rem 3rem;
    width: fit-content;
  }

  h3.how-to-play-title {
    border-bottom: 0.1rem solid white;
    font-weight: 500;
    grid-column-end: 3;
    grid-column-start: 1;
    overflow: hidden;
    padding-bottom: 0.5rem;
    text-align: center;
    width: 100%;
    word-wrap: anywhere;
  }

  div.how-to-play-text {
    line-height: 1.5;
    padding-right: 2rem;
    white-space: nowrap;
  }

  div.how-to-play-diagram {
    border-left: 0.1rem solid white;
    display: grid;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.3rem;
    grid-template-columns: auto auto;
    padding-left: 2rem;
  }

  span.diagram-title {
    grid-column-end: 3;
    grid-column-start: 1;
    text-align: center;
  }

  span.diagram-element {
    align-items: center;
    background-color: var(--base-darker-primary);
    border: 0.15rem solid white;
    border-radius: 0.4rem;
    display: flex;
    font-weight: 500;
    justify-content: center;
    padding: 0.2rem 0rem;
    text-align: center;
  }

  span.button-help-text {
    border-bottom: 0.1rem solid white;
    overflow: hidden;
    padding-bottom: 1rem;
    word-wrap: anywhere;
  }

  span.toolbar-icon,
  span.page-icon {
    align-items: center;
    border-radius: 50%;
    color: var(--color-toolbar-button-text);
    display: flex;
    justify-content: center;
    text-align: center;
  }

  span.toolbar-icon {
    border: 0.3rem solid var(--color-toolbar-button-hover-border);
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.7);
    font-weight: var(--toolbar-base-font-weight);
    height: 4rem;
    margin-top: 1rem;
    width: 4rem;
  }

  span.page-icon {
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.6), 0 4px 15px 0 rgba(0, 0, 0, 0.6);
    margin-top: 2rem;
    padding: 0.5rem;
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 40;
  }

  .material-icons.md-24 {
    font-size: 24px;
  }
</style>