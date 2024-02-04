<script setup lang="ts">
import { onMounted } from "vue";

  const props = defineProps<{
    title: string
    textareaId: string
  }>()
</script>

<template>
  <div class="main-content-grid-item">
    <p>{{ title }}</p>
    <textarea v-bind:id="textareaId">A</textarea>
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
  }

  .main-content-grid-item > p:hover {
    background-color: var(--base-primary);
    border-color: var(--base-primary);
  }

  .main-content-grid-item > p:hover ~ textarea {
    border-color: var(--base-primary);
  }
</style>