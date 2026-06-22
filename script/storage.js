const BASE_URL_150 = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"

let allPokeData = []
let currentPokeData = []
let filteredPokemon = []

async function fetchDataJson() {
    let response = await fetch(BASE_URL_150);
    let responseToJson = await response.json();
  
    console.log(responseToJson);
      return responseToJson.results; 
}

async function fetchPokeData() {
    let pokemonList = await fetchDataJson()

    for (let index = 0; index < pokemonList.length; index++) {
        let pokemon = pokemonList[index];
        let response = await fetch(pokemon.url);
        let pokemonData = await response.json();

        allPokeData.push(pokemonData);
    }
    
    console.log(allPokeData);
     
}