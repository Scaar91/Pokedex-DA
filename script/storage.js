let limit = 20;
let offset = 0;


let allPokeData = [];
let currentPokeData = [];
let filteredPokemon = [];
let speciesCache = {};
let evoCache = {};



async function fetchAllDataJson() {
    let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    let responseToJson = await response.json();
  
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

    
    return allPokeData;
}

async function getSpeciesData(pokemon) {
     
    if (speciesCache[pokemon.id]) {
        return speciesCache[pokemon.id];
    }

    let response = await fetch(pokemon.species.url);
    let speciesData = await response.json();

    speciesCache[pokemon.id] = speciesData;

    
    return speciesData;

}

async function buildDialogData(pokemon) {
    const species = await getSpeciesData(pokemon);
    const evolution= await fetchEvolutionChain(species);
   

    console.log(pokemon);
    
    

    return {
        pokemon,
        genus: getGenus(species),
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: getAbilities(pokemon),
        stats: getStats(pokemon),
        moves: getMoves(pokemon),
        evolutionNames: getEvolutionNames(evolution.chain),
        evolutionChain: getEvolutionPictures(evolution.chain, allPokeData)
    };
    
}

function getAbilities(pokemon) {
    let abilities = [];

    for (let i = 0; i < pokemon.abilities.length; i++) {
        abilities.push(pokemon.abilities[i].ability.name);
    }
    console.log(abilities);
    

    return abilities.join(" / ");
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

function getMoves(pokemon){
    let moves = [];

    for (let i = 0; i < 10; i++) {
        moves.push(`<span class="move">${pokemon.moves[i].move.name}</span>`);
    }

    return moves.join("");
}
    
 async function fetchEvolutionChain(speciesData){

     if (evoCache[speciesData.evolution_chain.url]) {
        return evoCache[speciesData.evolution_chain.url];
    }

    let response = await fetch(speciesData.evolution_chain.url);
    let evoData = await response.json();

    console.log(evoData);

    evoCache[speciesData.evolution_chain.url] = evoData;

    
    return evoData;
} 

function getEvolutionNames(chain) {
    
    let evoNames = [];
    let current = chain;

    for (let i = 0; i < 10; i++) {
        if (!current) break;

        evoNames.push(current.species.name);

        current = current.evolves_to[0];
    }

    return evoNames;
}

function findPokemon(name, allPokeData) {
    return allPokeData.find(p => p.name === name);
}

function getEvolutionPictures(chain, allPokeData) {
    let result = [];
    let current = chain;

    for (let i = 0; i < 10; i++) {
        if (!current) break;

        const name = current.species.name;
        const pokemon = findPokemon(name, allPokeData);

        result.push({
            name: name,
            img: pokemon?.sprites?.other?.["dream_world"]?.front_default
                || pokemon?.sprites?.front_default
        });

        current = current.evolves_to[0];
    }

    return result;
}