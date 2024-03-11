<script setup lang="ts">
  import NavBar from './Monoalphabetic/Bars/NavBar.vue';
  import ToolBar from './Monoalphabetic/Bars/ToolBar.vue';
  import EncryptedTextField from './Monoalphabetic/TextFields/EncryptedTextField.vue';
  import DecryptedTextField from './Monoalphabetic/TextFields/DecryptedTextField.vue';
  import TextLetterGrid from './Monoalphabetic/LetterGrids/TextLetterGrid.vue';
  import DecipherLetterGrid from './Monoalphabetic/LetterGrids/DecipherLetterGrid.vue';
  import SpanishLetterGrid from './Monoalphabetic/LetterGrids/SpanishLetterGrid.vue';
  import AboutMono from './Monoalphabetic/AboutMono/AboutMono.vue';
  import EndgamePopup from './Monoalphabetic/EndgamePopup/EndgamePopup.vue';
  import TextSettings from './Monoalphabetic/TextSettings.vue';
  import SessionExpiredPopup from './Monoalphabetic/SessionExpiredPopup.vue';
  import { useSessionStore } from '../composables/Monoalphabetic/Stores/sessionStore';
  import { populateNewText, isSessionExpired } from '../composables/Monoalphabetic/ButtonFunctionality/populateNewText';
  import { isTherePreviousActiveSession, subscribeToStores } from '../composables/Monoalphabetic/Stores/storeSubscriptions';
  import { onMounted, onUnmounted } from 'vue';

  onMounted(async () => {
    
    document.title = "Criptografía | Cifrado monoalfabético";
    subscribeToStores();
    
    if (isSessionExpired())
      await populateNewText();
    else {
      const sessionStore = useSessionStore();
      sessionStore.startSessionExpirationTimer();
    }
  });

  onUnmounted(async () => {
    const sessionStore = useSessionStore();
    sessionStore.stopSessionExpirationTimer();
  });
</script>

<template>
  <div>
    <header>
      <NavBar />
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
  </div>
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
