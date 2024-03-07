<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <!-- @vue-ignore -->
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <router-view v-slot="{ Component, route }">
    <transition :name="'fading'" mode="out-in">
      <div v-if="route.path == '/'">
        <footer class="footer">
          <p>By</p>
          <a href="https://github.com/jleon95">
            <i class="fa">&#xf09b;</i> <p>@jleon95</p>
          </a>
        </footer>
      </div>
    </transition>
  </router-view>
</template>

<style>
  .footer {
    align-items: center;
    background-color: var(--color-footer-background);
    bottom: 0;
    display: flex;
    gap: 1rem;
    justify-content: center;
    min-height: 3rem;
    padding: 0.5rem 0;
    position: fixed;
    right: 0;
    width: 100%;
  }

  .footer > a {
    align-items: center;
    background-color: var(--color-footer-github-card-name-background);
    border-radius: 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    color: var(--color-footer-github-card-name-text);
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    padding: 0 0.7rem 0 0;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  .footer > a:hover {
    background-color: var(--color-footer-github-card-hover);
  }

  .footer i {
    color: var(--color-footer-github-card-icon-background);
    filter: invert(100%);
    font-size: 2.5rem;
  }

  .footer p {
    color: white;
  }

  .fading-enter-from,
  .fading-leave-to {
    opacity: 0;
  }

  .fading-enter-active,
  .fading-leave-active {
    transition: all 0.7s ease
  }

  .main-enter-from {
    transform: translate3d(0, -75vh, 0);
    -webkit-transform: translate3d(0, -75vh, 0);
  }

  .main-leave-to {
    opacity: 0;
  }

  .main-enter-active,
  .main-leave-active {
    transition: all 0.7s ease;
  }

  .monoalphabetic-enter-from,
  .monoalphabetic-leave-to {
    opacity: 0;
  }

  .monoalphabetic-enter-active,
  .monoalphabetic-leave-active {
    transition: all 0.7s ease
  }
</style>