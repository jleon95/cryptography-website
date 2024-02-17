<script setup lang="ts">
  import EncryptionExample from './EncryptionExample.vue';
</script>

<template>
  <div id="about-mono-second-page">
    <div class="button-help-row">
      <div class="button-help-blob">
        <span class="text-blob">
          Usa este botón para validar las letras no confirmadas (no asignadas o evaluadas previamente como incorrectas).
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">done_all</span>
      </div>
      <div class="button-help-blob">
        <span class="text-blob">
          Usa este botón para solicitar una pista, que confirmará una letra al azar dando mayor probabilidad a las más frecuentes.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">search</span>
      </div>
      <div class="button-help-blob">
        <span class="text-blob">
          Usa este botón para reiniciar la asignación de letras de la partida actual. Se mantendrán las letras ya confirmadas.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">restart_alt</span>
      </div>
      <div class="button-help-blob">
        <span class="text-blob">
          Usa este botón para empezar una nueva partida. Se mantendrán las opciones de formato del texto activas actualmente.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">add</span>
      </div>
    </div>
    <div class="button-help-row">
      <div class="button-help-blob">
        <span class="text-blob">
          Usa este botón para cambiar las opciones de formato del texto (mantener espacios y/o signos de puntuación).
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">settings</span>
      </div>
      <div class="button-help-blob">
        <span class="text-blob">
          Usa este botón para desplegar la tabla de frecuencias de las letras en el idioma español.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">info</span>
      </div>
      <div class="button-help-blob">
        <span class="text-blob">
          Usa este botón para mostrar el texto original sin encriptar. <b>Esto finalizará la partida</b>.
        </span>
        <span class="toolbar-icon material-symbols-outlined material-icons md-24">grading</span>
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
    height: 100%;
    justify-content: center;
    padding: 3% 0;
    width: 50%;
  }

  .button-help-row {
    align-items: center;
    display: flex;
    height: 50%;
    justify-content: center;
    width: 85%;
  }

  .button-help-blob {
    align-items: center;
    background: var(--color-aboutthis-blob-background);
    border: 0.2rem solid var(--color-aboutthis-blob-border);
    border-radius: 2rem;
    color: white;
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin: 0 1rem;
    max-width: 23rem;
    padding: 2rem;
    text-align: justify;
  }

  span.text-blob {
    border-bottom: 0.1rem solid white;
    overflow: hidden;
    padding-bottom: 1rem;
    word-wrap: anywhere;
  }

  span.toolbar-icon {
    align-items: center;
    border: 0.3rem solid var(--color-toolbar-button-hover-border);
    border-radius: 50%;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.7);
    color: var(--color-toolbar-button-text);
    display: flex;
    font-weight: var(--toolbar-base-font-weight);
    height: 4rem;
    justify-content: center;
    margin-top: 1rem;
    text-align: center;
    width: 4rem;
  }
</style>