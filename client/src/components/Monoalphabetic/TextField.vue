<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useGameDifficultyStore } from '../../composables/Monoalphabetic/gameDifficultyStore';
  import { useTextStore } from '../../composables/Monoalphabetic/textStore';
  import { callAPI, Action } from '../../composables/Monoalphabetic/apiCalls';
  import type { NewTextRequestOptions, NewTextResponse } from '../../composables/Monoalphabetic/apiCalls';

  const props = defineProps<{
    title: string
    textareaId: string
  }>()

  const gameDifficultyStore = useGameDifficultyStore();
  const textStore = useTextStore();

  async function populateNewText() {
    const options: NewTextRequestOptions = {
      difficultyOptions: {
        keepSpaces: gameDifficultyStore.keepSpaces,
        keepPunctuation: gameDifficultyStore.keepPunctuation
      },
      sessionData: {
        sessionId: textStore.sessionId
      }
    };
    const response: NewTextResponse = await callAPI(Action.NEW_TEXT, options);
    textStore.text = response.encryptedText;
    textStore.setExpirationDate(new Date(response.sessionData!.expirationDate));
  }

  onMounted(function () {
    if (props.textareaId == "decrypted-text") {
      document.getElementById("decrypted-text")!.addEventListener("populate-new-text-event", populateNewText);
    }
  });
</script>

<template>
  <div class="main-content-grid-item">
    <p>{{ title }}</p>
    <textarea v-bind:id="textareaId" readonly>{{ textStore.text }}</textarea>
  </div>
</template>

<style scoped>
  .main-content-grid-item {
    display: flex;
    flex-direction: column;
    padding: 2% 7%;
  }

  .main-content-grid-item > p {
    background-color: var(--color-mono-textarea-title-background);
    border: 0.2rem solid var(--color-mono-textarea-title-border);
    border-radius: 1rem 1rem 0 0;
    color: var(--color-mono-textarea-title-text);
    font-weight: 500;
    padding: 0.2rem 0.5rem;
    transition: all ease 0.2s;
    width: 33%;
  }

  .main-content-grid-item > textarea {
    background-color: var(--color-mono-textarea-text);
    border: 0.2rem solid var(--color-mono-textarea-border);
    border-radius: 0 1rem 1rem 1rem;
    height: 25rem;
    padding: 0.5rem;
    resize: none;
    transition: all ease 0.2s;
    line-break: anywhere;
  }

  .main-content-grid-item > p:hover {
    background-color: var(--base-primary);
    border-color: var(--base-primary);
  }

  .main-content-grid-item > p:hover ~ textarea {
    border-color: var(--base-primary);
  }
</style>