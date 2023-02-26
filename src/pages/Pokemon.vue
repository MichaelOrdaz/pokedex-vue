<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPokemon } from '../api/getPokemon';
import { routeNames } from '../routes';

interface baseProp {
  name: string
  url: string
}

interface Pokemon {
  id: number
  name: string
  weight: number
  height: number
  types: {
    slot: number
    type: baseProp
  }[]
  order: number
  location_area_encounters: string
  abilities: {
    ability: baseProp
    is_hidden: boolean
    slot: number
  }[]
  form: baseProp[]
  is_default: boolean
  sprites: {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
  }
  stats: {
    base_stat: number
    effort: number
    stat: baseProp
  }[]
}

const route = useRoute()

const pokemon = ref<Pokemon>()

const fetchPokemon = () => {
  getPokemon('https://pokeapi.co/api/v2/pokemon/' + route.params.id)
  .then(response => {
    console.log(response)
    pokemon.value = response
  })
}
onMounted(fetchPokemon)

watch(() => route.params.id, fetchPokemon)
</script>

<template>

  <div>
    <button class="btn-go-back" @click="$router.push({name: routeNames.HOME})">Go to Pokedex</button>
  </div>
  <div class="row-header">
    <h4 @click="$router.push({name: routeNames.POKEMON, params: {id: (Number(route.params.id) - 1)}})" class="cursor-pointer">Previous</h4>
    <h1>{{ pokemon?.name }}<small>No.{{route.params.id}}</small></h1>
    <h4 @click="$router.push({name: routeNames.POKEMON, params: {id: (Number(route.params.id) + 1)}})" class="cursor-pointer">Next</h4>
  </div>

  <div class="poke-types">
    <span 
      v-for="type in pokemon?.types"
      :key="type.slot"
      :class="`pokemon-type-${type.type.name}`"
    >
      {{ type.type.name }}
    </span>
  </div>

  <div class="row">
    <div class="col bg-poke">
      <img :src="pokemon?.sprites.front_default as string" :alt="pokemon?.name" class="poke-img" />
    </div>
    <div class="col poke-info">
      <div>Altura: {{pokemon?.height}}</div>
      <div>Peso: {{pokemon?.weight}}</div>

      <div>
        <h4>Stats</h4>
        <table class="table">
          <tr
            v-for="stat in pokemon?.stats"
            :key="stat.stat.name"
          >
            <th>{{ stat.stat.name }}</th>
            <td>{{ stat.base_stat }}</td>
          </tr>
        </table>
      </div>

      <div>
        <h4>Habilites</h4>
        <span v-for="ability in pokemon?.abilities" :key="ability.slot" class="ability">
          {{ ability.ability.name }}
        </span>
      </div>
    </div>
  </div>

  <div class="row" :style="{marginTop: '20px'}">
    <div
      v-for="sprite in [
        pokemon?.sprites.front_default,
        pokemon?.sprites.back_default,
        pokemon?.sprites.front_female,
        pokemon?.sprites.back_female,
        pokemon?.sprites.front_shiny,
        pokemon?.sprites.back_shiny,
        pokemon?.sprites.front_shiny_female,
        pokemon?.sprites.back_shiny_female,
      ].filter(i => i)"
      class="col bg-poke"
    >
      <img :src="sprite as string" :alt="pokemon?.name" class="poke-img" />
    </div>
  </div>
</template>

<style scoped>
.btn-go-back {
  border: none;
  background-color: orange;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  margin: 10px 30px;
  font-weight: bold;
}
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.poke-types {
  text-align: center;
  padding: 20px;
}
.poke-types span {
  font-size: 20px;
  border-radius: 12px;
  padding: 4px 18px;
  margin: 10px;
  text-align: center;
  box-shadow: 0 0 6px #aaa;
}

.ability {
  background-color: gold;
  color: black;
  border-radius: 12px;
  padding: 6px 18px;
  margin-right: 10px;
  text-align: center;
  box-shadow: 0 0 6px #ddd;
}
.poke-info {
  padding: 25px;
}
.bg-poke {
  background-color: lightcyan;
}
.poke-img {
  display: block;
  margin: auto;
  width: 70%;
}
.row {
  display: flex;
  width: 75vw;
  margin: 0 auto;
}
.col {
  width: 50%;
}

.row-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  background-color: #111;
  color: white;
}
.row-header h4 {
  line-height: 80px;
}
h1 {
  font-size: 36px;
  text-transform: uppercase;
  margin: 0 20px;
  text-align: center;
  padding: 20px;
}

h1 > small {
  color: #666;
  font-size: 20px;
  margin-left: 20px;
  text-transform: initial;
}
</style>