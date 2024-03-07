<script setup lang="ts">
  import RoutingButtons from './MainPage/RoutingButtons.vue';
</script>

<template>
  <div>
    <header>
    </header>
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
    justify-content: center;
    width: 100%;
  }
</style>