<script setup lang="ts">
import LogoPokemon from './assets/logo-pokemon.png'
import { routeNames } from './routes';
</script>

<template>
  <div id="wrapper">
    <header class="header">
      <img :src="LogoPokemon" alt="pokemon" @click="$router.push({name: routeNames.HOME})" class="cursor-pointer" />
    </header>
    <main>
      <RouterView></RouterView>
    </main>
    <footer>
      @Pokemon API
    </footer>
  </div>
</template>

<style scoped>
.header {
  background-color: red;
  padding: 16px;
  color: white;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 0 20px lightcoral;
}

.header img {
  display: block;
  margin: 0 auto;
  width: 100px;
}

main {
  margin-bottom: 150px;
}
footer {
  background: #111;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
