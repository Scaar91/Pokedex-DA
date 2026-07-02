let limit = 20;
let offset = 0;


let allPokeData = [];
let currentPokeData = [];
let filteredPokemon = [];
let speciesCache = {};
let evoCache = {};
let searchBaseData = [];



async function fetchAllDataJson() {
    const currentLimit = Math.min(limit, 151 - offset);

    let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}&offset=${offset}`
    );
    let responseToJson = await response.json();
  
      return responseToJson.results;  
}

async function fetchAllPokeData() {
    let pokemonList = await fetchAllDataJson();

    for (let pokemon of pokemonList) {
        let response = await fetch(pokemon.url);
        let pokemonData = await response.json();

        allPokeData.push(pokemonData);
    }

    return allPokeData;
}

async function fetchSearchBase() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1510&offset=0");
    let data = await response.json();

    let list = [];

    for (let pokemon of data.results) {
        let res = await fetch(pokemon.url);
        let full = await res.json();
        list.push(full);
    }

    searchBaseData = list;
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
    return pokemon.abilities.map(a => a.ability.name);
}

function renderAbilities(abilities) {
    let html = "";

    for (let ability of abilities) {
        html += `<span class="ability-chip">${ability}</span>`;
    }

    return html;
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

    for (let i = 0; i < Math.min(10, pokemon.moves.length); i++) {
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

function getEvolutionPictures(chain) {
    let result = [];
    let current = chain;

    for (let i = 0; i < 10; i++) {
        if (!current) break;

        const name = current.species.name;
        const pokemon = findPokemon(name, searchBaseData);
 
        result.push({
            name: name,
            img: pokemon?.sprites?.other?.["dream_world"]?.front_default
                || pokemon?.sprites?.front_default
        });

        current = current.evolves_to[0];
    }


    return result;
}

function test() {


}