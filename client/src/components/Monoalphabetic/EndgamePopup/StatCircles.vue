<script setup lang="ts">
  import { useGameProgressStore } from '../../../composables/Monoalphabetic/Stores/gameProgressStore';

  const gameProgressStore = useGameProgressStore();
</script>

<template>
  <div id="endgame-validations-circle" class="endgame-stats-circle stats-validations">
    <p class="name material-symbols-outlined material-icons">check</p>
    <p class="value">{{ gameProgressStore.validationCounter }}</p>
  </div>
  <div id="endgame-time-circle" class="endgame-stats-circle stats-time">
    <p class="name material-symbols-outlined material-icons">timer</p>
    <p class="value">
      {{ gameProgressStore.getPrintableSessionDuration() }}
    </p>
  </div>
  <div id="endgame-hints-circle" class="endgame-stats-circle stats-hints">
    <p class="name material-symbols-outlined material-icons">search</p>
    <p class="value">{{ gameProgressStore.hintManagement.usedHints }}/{{ gameProgressStore.hintManagement.allowedHints }}</p>
  </div>
</template>

<style scoped>
  .endgame-stats-circle {
    align-content: center;
    border-bottom: 0.2rem solid var(--base-secondary);
    border-left: 0.2rem solid var(--base-secondary);
    border-radius: 50%;
    border-right: 0.2rem solid var(--base-secondary);
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;
    height: 5.5rem;
    overflow: hidden;
    position: fixed;
    transform: translate(-50%, -50%);
    width: 5.5rem;
  }

  .endgame-stats-circle > p {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }

  .stats-validations {
    left: -26%;
    top: 58%;
  }

  .stats-time {
    left: -18%;
    top: 58%;
  }

  .stats-hints {
    left: -10%;
    top: 58%;
  }

  .name {
    background-color: var(--base-secondary);
    border-bottom: 0.15rem solid white;
    color: white;
    font-size: 1.7rem;
    font-weight: 600;
    padding-top: 0.2rem;
  }

  .value {
    background-color: white;
    color: black;
    font-weight: 500;
    padding-bottom: 10%;
  }

  /*Animation code*/
  .roll-in-validations {
    animation-delay: 0.5s;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-name: roll-in-validations;
    animation-timing-function: ease-out;
  }

  .roll-out-validations {
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-name: roll-out-validations;
  }

  @keyframes roll-in-validations {
    0% {
      left: -26%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    85% {
      left: 43%;
      transform: translate(-50%, -50%) rotate(1100deg);
    }
    100% {
      left: 42%;
      transform: translate(-50%, -50%) rotate(1080deg);
    }
  }

  @keyframes roll-out-validations {
    from {
      left: 42%;
      transform: translate(-50%, -50%) rotate(1080deg);
    }
    to {
      left: 126%;
      transform: translate(-50%, -50%) rotate(2160deg);
    }
  }

  .roll-in-time {
    animation-delay: 0.5s;
    animation-duration: 1.3s;
    animation-fill-mode: forwards;
    animation-name: roll-in-time;
    animation-timing-function: ease-out;
  }

  .roll-out-time {
    animation-duration: 1.3s;
    animation-fill-mode: forwards;
    animation-name: roll-out-time;
  }

  @keyframes roll-in-time {
    0% {
      left: -18%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    85% {
      left: 51%;
      transform: translate(-50%, -50%) rotate(1100deg);
    }
    100% {
      left: 50%;
      transform: translate(-50%, -50%) rotate(1080deg);
    }
  }

  @keyframes roll-out-time {
    from {
      left: 50%;
      transform: translate(-50%, -50%) rotate(1080deg);
    }
    to {
      left: 118%;
      transform: translate(-50%, -50%) rotate(2160deg);
    }
  }

  .roll-in-hints {
    animation-delay: 0.5s;
    animation-duration: 1.1s;
    animation-fill-mode: forwards;
    animation-name: roll-in-hints;
    animation-timing-function: ease-out;
  }

  .roll-out-hints {
    animation-duration: 1.1s;
    animation-fill-mode: forwards;
    animation-name: roll-out-hints;
  }

  @keyframes roll-in-hints {
    0% {
      left: -10%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    85% {
      left: 59%;
      transform: translate(-50%, -50%) rotate(1100deg);
    }
    100% {
      left: 58%;
      transform: translate(-50%, -50%) rotate(1080deg);
    }
  }

  @keyframes roll-out-hints {
    from {
      left: 58%;
      transform: translate(-50%, -50%) rotate(1080deg);
    }
    to {
      left: 110%;
      transform: translate(-50%, -50%) rotate(2160deg);
    }
  }
</style>