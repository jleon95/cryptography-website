<template>
  <div class="main">
    <div class="container">
      <router-link class="material-symbols-outlined material-icons md-28" to="/monoalphabetic">
        swap_horiz
      </router-link>
      <a class="material-symbols-outlined material-icons md-28 disabled">
        donut_large
      </a>
      <a class="material-symbols-outlined material-icons md-28">
        question_mark
      </a>
    </div>
  </div>
</template>

<style scoped>
  a { /*<router-link> is converted to <a>*/
    text-decoration: none;
  }

  /* Source: https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/ */
  .main {
    display: flex;
    filter: drop-shadow(0 8px 6px rgba(0, 0, 0, 0.5));
    max-width: 180px;
    --f: calc(var(--s) * 1.732 + 4 * var(--m) - 1px);
    --m: 5px; /* margin */
    --s: 80px; /* size  */
  }

  .container {
    font-size: 0; /* disable white space between inline block element */
  }

  .container a {
    align-items: center;
    background-color: var(--base-dark-primary);
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    color: white;
    display: inline-flex;
    font-size: initial;
    height: calc(var(--s) * 1.1547);
    justify-content: center;
    margin: var(--m);
    margin-bottom: calc(var(--m) - var(--s) * 0.2885);
    transition: all ease 0.5s;
    width: var(--s);
  }

  .container a:hover {
    background-color: var(--base-secondary);
    transform: rotate(360deg);
  }

  .container a.disabled {
    pointer-events: none;
    background-color: var(--base-mute-primary);
  }

  .container::before {
    content: "";
    float: left;
    height: 120%;
    shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 3px), #000 0 var(--f));
    width: calc(var(--s) / 2 + var(--m));
  }

  .material-icons.md-28 {
    font-size: 28px;
  }
</style>