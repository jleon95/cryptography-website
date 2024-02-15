<script setup lang="ts">
  import { useGameProgressStore } from '../../../composables/Monoalphabetic/Stores/gameProgressStore';

  const gameProgressStore = useGameProgressStore();
</script>

<template>
  <div id="endgame-horizontal-bar-punctuation" class="endgame-horizontal-container kept-punctuation">
    <div class="endgame-horizontal-container-title">
      ¿Utilizando signos de puntuación? {{ gameProgressStore.usedTextSettings.keepPunctuation ? "Sí": "No" }}
    </div>
  </div>
  <div id="endgame-horizontal-bar-spaces" class="endgame-horizontal-container kept-spaces">
    <div class="endgame-horizontal-container-title">
      ¿Utilizando espacios? {{ gameProgressStore.usedTextSettings.keepSpaces ? "Sí": "No" }}
    </div>
  </div>
</template>

<style scoped>
  .endgame-horizontal-container {
    align-items: center;
    background-color: rgba(0,0,0,0.35);
    display: flex;
    flex-direction: column;
    height: 4.5vh;
    left: 150%;
    position: fixed;
    transform: translate(-50%, -50%);
    width: 400vw;
  }

  .kept-punctuation {
    top: 70%;
  }

  .kept-spaces {
    top: 76%;
  }

  .endgame-horizontal-container-title {
    align-content: center;
    align-items: center;
    color: white;
    display: flex;
    font-size: 1.3rem;
    height: 100%;
    justify-content: center;
    padding: 1rem 0;
    text-align: center;
    width: 100vw;
  }

  .roll-in-info-bar {
    animation-delay: 1s;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-name: roll-in-info-bar;
  }

  @keyframes roll-in-info-bar {
    from {
      left: 150%;
    }
    to {
      left: 50%;
    }
  }

  .roll-out-info-bar {
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-name: roll-out-info-bar;
  }

  @keyframes roll-out-info-bar {
    from {
      left: 50%;
    }

    to {
      left: -50%;
    }
  }
</style>