<template>
  <router-link to="/monoalphabetic">
    <div class="card">
      <div class="header">
        <h1>1</h1>
      </div>
      <div class="container">
        <p>Cifrado monoalfabético</p>
      </div>
    </div>
  </router-link>
  <div class="card">
    <div class="header">
      <h1>2</h1>
    </div>
    <div class="container">
      <p>Cifrado por transposición</p>
    </div>
  </div>
</template>

<style scoped>
  a { /*<router-link> is converted to <a>*/
    text-decoration: none;
  }

  div.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 0 1rem;
    overflow: hidden;
    text-align: center;
    transition: all 0.2s;
    width: 250px;
  }

  div.card:hover {
    transform: scale(1.1, 1.1);
  }

  div.header {
    background-color: var(--color-mainpage-button-card-background);
    color: var(--color-mainpage-button-card-text);
    font-size: 2.5rem;
    padding: 10px;
  }

  div.container {
    background-color: var(--color-mainpage-button-caption-background);
    color: var(--color-mainpage-button-caption-text);
    padding: 1rem;
  }
</style>