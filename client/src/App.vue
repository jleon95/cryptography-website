<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import EncryptedTextField from './components/Monoalphabetic/EncryptedTextField.vue'
  import DecryptedTextField from './components/Monoalphabetic/DecryptedTextField.vue'
  import TextLetterGrid from './components/Monoalphabetic/TextLetterGrid.vue'
  import DecipherLetterGrid from './components/Monoalphabetic/DecipherLetterGrid.vue'
  import SpanishLetterGrid from './components/Monoalphabetic/SpanishLetterGrid.vue'
  import ToolBar from './components/Monoalphabetic/ToolBar.vue'
  import AboutMono from './components/Monoalphabetic/AboutMono/AboutMono.vue'
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <main>
    <div class="main-content-grid">
      <EncryptedTextField />
      <DecryptedTextField />
      <TextLetterGrid />
      <DecipherLetterGrid />
      <SpanishLetterGrid />
    </div>
    <AboutMono />
    <ToolBar />
  </main>
</template>

<style scoped>
  .main-content-grid {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
    margin-bottom: 8rem;
  }
</style>
