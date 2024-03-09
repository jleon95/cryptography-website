<script setup lang="ts">

</script>

<template>
  <div id="about-this-webpage" class="about-this-webpage">
    <span id="about-this-webpage-text" class="about-this-webpage-text">
      El propósito de esta página es mostrar interactivamente algunos conceptos del campo de la criptografía. En los demás botones encontrarás los minijuegos disponibles.
    </span>
   </div>
</template>

<style scoped>
  .about-this-webpage {
    align-items: center;
    background-color: var(--base-black-mute);
    border-radius: 0.5rem;
    color: white;
    display: flex;
    justify-content: center;
    left: 50%;
    max-width: 33%;
    padding: 1rem;
    position: absolute;
    text-align: justify;
    top: 150%;
    transform: translate(-50%, 0) scale(0,1);
    width: fit-content;
  }

  .deploy-about-this-webpage {
    animation-delay: 0.5s;
    animation-duration: 15s;
    animation-name: deploy-about-this-webpage;
    animation-timing-function: ease;
  }

  .deploy-about-this-webpage-text {
    animation-delay: 0.5s;
    animation-duration: 15s;
    animation-name: deploy-about-this-webpage-text;
    animation-timing-function: ease;
  }

  @keyframes deploy-about-this-webpage {
    0% {
      transform: translate(-50%, 0) scale(0,1);
    }
    5% {
      box-shadow: none;
      transform: translate(-50%, 0) scale(1,1);
    }
    10% {
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
      transform: translate(-50%, 0) scale(1,1);
    }
    90% {
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
      transform: translate(-50%, 0) scale(1,1);
    }
    95% {
      box-shadow: none;
      transform: translate(-50%, 0) scale(1,1);
    }
    100% {
      transform: translate(-50%, 0) scale(0,1);
    }
  }

  @keyframes deploy-about-this-webpage-text {
    0% {
      opacity: 0;
    }
    5% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    95% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>