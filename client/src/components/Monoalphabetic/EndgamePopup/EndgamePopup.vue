<script setup lang="ts">
  import { removeEndgameScreen } from '../../../composables/Monoalphabetic/deployEndgamePopup';
  import StatCircles from './StatCircles.vue';
  import InfoBars from './InfoBars.vue';
</script>

<template>
  <div @click="removeEndgameScreen" id="endgame-background" class="endgame-global-container">
    <div class="endgame-title">
      ¡Has ganado!
    </div>
    <StatCircles />
    <InfoBars />
  </div>
</template>

<style scoped>
  .endgame-global-container {
    backdrop-filter: blur(0.2rem);
    background-color: rgba(0,0,0,0.2);
    display: none;
    height: 100vh;
    left: 50%;
    opacity: 0;
    position: fixed;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 100vw;
  }

  .endgame-title {
    align-items: center;
    color: white;
    display: flex;
    font-size: 4rem;
    justify-content: center;
    left: 50%;
    position: fixed;
    text-align: center;
    text-shadow: 0.3rem 0.3rem 0.4rem rgba(0,0,0,1);
    top: 40%;
    transform: translate(-50%, -50%);
  }

  .fade-in-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-name: fade-in-background;
    animation-timing-function: ease;
    display: unset;
  }

  @keyframes fade-in-background {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .fade-out-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-name: fade-out-background;
    animation-timing-function: ease;
    display: unset;
  }

  @keyframes fade-out-background {
    from { opacity: 1; }
    to { opacity: 0; }
  }
</style>