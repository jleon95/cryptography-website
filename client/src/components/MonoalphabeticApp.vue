<script setup lang="ts">
  import NavBar from './Monoalphabetic/NavBar.vue';
  import EncryptedTextField from './Monoalphabetic/EncryptedTextField.vue';
  import DecryptedTextField from './Monoalphabetic/DecryptedTextField.vue';
  import TextLetterGrid from './Monoalphabetic/TextLetterGrid.vue';
  import DecipherLetterGrid from './Monoalphabetic/DecipherLetterGrid.vue';
  import SpanishLetterGrid from './Monoalphabetic/SpanishLetterGrid.vue';
  import ToolBar from './Monoalphabetic/ToolBar.vue';
  import AboutMono from './Monoalphabetic/AboutMono/AboutMono.vue';
  import EndgamePopup from './Monoalphabetic/EndgamePopup/EndgamePopup.vue';
  import TextSettings from './Monoalphabetic/TextSettings.vue';
  import SessionExpiredPopup from './Monoalphabetic/SessionExpiredPopup.vue';
  import { useSessionStore } from '../composables/Monoalphabetic/Stores/sessionStore';
  import { populateNewText, isSessionExpired } from '../composables/Monoalphabetic/ButtonFunctionality/populateNewText';
  import { isTherePreviousActiveSession, subscribeToStores } from '../composables/Monoalphabetic/Stores/storeSubscriptions';
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
