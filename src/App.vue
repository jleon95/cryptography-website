<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import TextField from './components/TextField.vue'
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
      <TextField title="Texto encriptado" textareaId="encrypted-text"/>
      <TextField title="Texto desencriptado" textareaId="decrypted-text"/>
      <TextLetterGrid />
      <DecipherLetterGrid />
      <SpanishLetterGrid />
    </div>
  </main>
</template>

<style scoped>
  .main-content-grid {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
  }
</style>
