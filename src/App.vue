<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import TextLetterGrid from './components/TextLetterGrid.vue'
import DecipherLetterGrid from './components/DecipherLetterGrid.vue'
import SpanishLetterGrid from './components/SpanishLetterGrid.vue'
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <main>
    <div class="main-content-grid">
      <TextLetterGrid/>
      <DecipherLetterGrid/>
      <SpanishLetterGrid/>
    </div>
  </main>
</template>

<style scoped>
  .main-content-grid {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
  }

  .table-title {
    color: var(--base-very-dark-primary);
    font-weight: 500;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    text-align: center;
  }
</style>
