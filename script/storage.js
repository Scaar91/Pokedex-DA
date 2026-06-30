let limit = 20;
let offset = 0;


let allPokeData = [];
let currentPokeData = [];
let filteredPokemon = [];
let speciesCache = {};



async function fetchAllDataJson() {
    let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    let responseToJson = await response.json();
  
    console.log(responseToJson);
      return responseToJson.results; 
}

async function fetchAllPokeData() {
    let pokemonList = await fetchAllDataJson()

    for (let index = 0; index < pokemonList.length; index++) {
        let pokemon = pokemonList[index];
        let response = await fetch(pokemon.url);
        let pokemonData = await response.json();

        allPokeData.push(pokemonData);
    }
    
    console.log(allPokeData);
    return allPokeData;
}

async function getSpeciesData(pokemon) {
    if (speciesCache[pokemon.id]) {
        return speciesCache[pokemon.id];
    }

    let response = await fetch(pokemon.species.url);
    let speciesData = await response.json();

    speciesCache[pokemon.id] = speciesData;

    console.log(speciesData);

    return speciesData;

}

async function buildDialogData(pokemon) {
    const species = await getSpeciesData(pokemon);

    return {
        genus: getGenus(species),
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: getAbilities(pokemon),
        stats: getStats(pokemon)
    };
}

function getAbilities(pokemon) {
    return pokemon.abilities
        .map(ability => ability.ability.name)
        .join(", ");
}

function getStats(pokemon) {
    return {
        hp: pokemon.stats.find(stat => stat.stat.name === "hp").base_stat,
        attack: pokemon.stats.find(stat => stat.stat.name === "attack").base_stat,
        defense: pokemon.stats.find(stat => stat.stat.name === "defense").base_stat,
        specialAttack: pokemon.stats.find(stat => stat.stat.name === "special-attack").base_stat,
        specialDefense: pokemon.stats.find(stat => stat.stat.name === "special-defense").base_stat,
        speed: pokemon.stats.find(stat => stat.stat.name === "speed").base_stat
    };
}

function getGenus(speciesData) {
    for (let i = 0; i < speciesData.genera.length; i++) {
        if (speciesData.genera[i].language.name === "en") {
            return speciesData.genera[i].genus;
        }
    }
}


