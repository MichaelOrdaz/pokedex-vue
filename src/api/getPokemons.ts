export function getPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed fetch pokemons')
    }

    return response.json()
  })
}