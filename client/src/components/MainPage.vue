<script setup lang="ts">
  import RoutingButtons from './MainPage/RoutingButtons.vue';
  import { onMounted } from 'vue';

  onMounted(() => {
    document.title = "Criptografía | Menú principal";
  })
</script>

<template>
  <div>
    <main>
      <div class="button-container">
        <RoutingButtons />
      </div>
    </main>
  </div>
</template>

<style scoped>
  .button-container {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
  }
</style>