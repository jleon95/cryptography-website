<script setup lang="ts">
  import NavBar from './components/NavBar.vue';
  import EncryptedTextField from './components/Monoalphabetic/EncryptedTextField.vue';
  import DecryptedTextField from './components/Monoalphabetic/DecryptedTextField.vue';
  import TextLetterGrid from './components/Monoalphabetic/TextLetterGrid.vue';
  import DecipherLetterGrid from './components/Monoalphabetic/DecipherLetterGrid.vue';
  import SpanishLetterGrid from './components/Monoalphabetic/SpanishLetterGrid.vue';
  import ToolBar from './components/Monoalphabetic/ToolBar.vue';
  import AboutMono from './components/Monoalphabetic/AboutMono/AboutMono.vue';
  import EndgamePopup from './components/Monoalphabetic/EndgamePopup/EndgamePopup.vue';
  import TextSettings from './components/Monoalphabetic/TextSettings.vue';
  import SessionExpiredPopup from './components/Monoalphabetic/SessionExpiredPopup.vue';
  import { useSessionStore } from './composables/Monoalphabetic/Stores/sessionStore';
  import { populateNewText, isSessionExpired } from './composables/Monoalphabetic/ButtonFunctionality/populateNewText';
  import { isTherePreviousActiveSession, subscribeToStores } from './composables/Monoalphabetic/Stores/storeSubscriptions';
  import { onMounted } from 'vue';

  onMounted(async () => {
    
    subscribeToStores();
    
    if (isSessionExpired())
      await populateNewText();
    else {
      const sessionStore = useSessionStore();
      sessionStore.startSessionExpirationTimer();
    }
  });
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
    <TextSettings />
    <SessionExpiredPopup />
    <EndgamePopup />
    <ToolBar />
  </main>
</template>

<style scoped>
  .main-content-grid {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 5rem;
  }
</style>
