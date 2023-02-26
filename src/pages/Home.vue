<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import {getPokemons} from '../api/getPokemons'
import { routeNames } from '../routes';

interface Pokemon {
  name: string,
  url: string
}

const URL_BASE_IMAGES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png'

const pokemons = ref<Pokemon[]>([])
const query = ref('')
const scrollY = ref(0)

const router = useRouter()

const listenScroll = () => {
  console.log(window.scrollY)
  scrollY.value = window.scrollY
}

onMounted(async () => {
  const response = await getPokemons()
  pokemons.value = response.results

  window.addEventListener('scroll', listenScroll)
})

onUnmounted(() => window.removeEventListener('scroll', listenScroll))

const generateUrlPokemon = (pokemon: Pokemon) => {
  return URL_BASE_IMAGES.replace(/{id}/, pokemon.url.split('/').filter((i: string) => i).pop() as string)
}

const pokemonFiltered = computed(() => {
  return pokemons.value.filter((pokemon) => {
    return !query || pokemon.name.toLowerCase().match(query.value.toLowerCase())
  })
})

const toTop = () => {
  window.scroll({top: 0, behavior: 'smooth'})
}

const goToPokemonDetail = (id: string) => {
  console.log(id)
  router.push({name: routeNames.POKEMON, params: {id}})
}

</script>
<template>
  <nav class="nav">
    <input type="search" class="input" placeholder="Buscar pokemon" v-model="query" />
  </nav>
  <section class="grid">
    <div
      v-for="pokemon in pokemonFiltered"
      :key="pokemon.name"
      class="card"
      @click="goToPokemonDetail(pokemon.url.split('/').filter((i: string) => i).pop() as string)"
    >
      <img :src="generateUrlPokemon(pokemon)" :alt="pokemon.name" />
      <div class="poke-id">{{ pokemon.url.split('/').filter((i: string) => i).pop() as string }}</div>
      <h4 class="poke-title">{{ pokemon.name }}</h4>
      <div>
      </div>
    </div>
  </section>
  <button class="btn-top" @click="toTop" :style="{opacity: scrollY <= 500 ? '0' : '.4'}">
    to top
  </button>
</template>
<style scoped>
.btn-top {
  position: fixed;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: none;
  right: 50px;
  bottom: 80px;
  color: white;
  text-align: center;
  background: #0000ff;
  opacity: .4;
  cursor: pointer;
  transition: all 1s;
}

.btn-top:hover {
  box-shadow: 0 0 8px blue;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 20px 40px;
  justify-content: center;
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 750px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .grid {
    grid-template-columns: 60vw;
  }
}

.card {
  padding: 20px;
  box-shadow: 0 0 4px gray;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: beige;
  cursor: pointer;
}

.card img {
  width: 100%;
}

@keyframes pum {
  to {
    transform: translateY(-5px);
  }
}

.card:hover {
  animation: pum;
  animation-duration: 100ms;
  animation-timing-function: linear;
}

.card .poke-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  color: indigo;
}

.card .poke-id {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.card .poke-id::before {
  content: '#';
}
.nav {
  background: #111;
  color: white;
  padding: 12px;
  display: flex;
  justify-content: center;
}

.nav input {
  border: none;
  padding: 20px;
  border-radius: 12px;
  font-size: 18px;
  width: auto;
  max-width: 300px;
}

</style>