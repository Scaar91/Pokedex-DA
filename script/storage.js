let limit = 20;
let offset = 0;
let allPokeData = [];
let currentPokeData = [];
let filteredPokemon = [];
let speciesCache = {};
let evoCache = {};
let searchBaseData = [];

async function fetchAllDataJson() {
    let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    let responseToJson = await response.json();
    return responseToJson.results;
}

async function fetchAllPokeData() {
    let pokemonList = await fetchAllDataJson();
    const newData = [];

    for (let pokemon of pokemonList) {
        let response = await fetch(pokemon.url);
        let pokemonData = await response.json();
        newData.push(pokemonData);
    }
    allPokeData = [...allPokeData, ...newData];
}

async function fetchSearchBase() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
    const data = await response.json();
    searchBaseData = data.results;
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
    const evolution = await fetchEvolutionChain(species);
    return {
        pokemon,
        description: getDescription(species),
        genus: getGenus(species),
        height: pokemon.height,
        weight: pokemon.weight,
        stats: getStats(pokemon),
        moves: getMoves(pokemon),
        evolutionNames: getEvolutionNames(evolution.chain),
        evolutionChain: await getEvolutionPictures(evolution.chain, allPokeData)
    };
}

function getPokemonImage(pokemon) {
    const img =
        pokemon.sprites.other?.dream_world?.front_default ||
        pokemon.sprites.other?.["official-artwork"]?.front_default ||
        pokemon.sprites.front_default
    return img;
}

function getDescription(species) {
    const entry = species.flavor_text_entries.find(
        entry => entry.language.name === "en"
    );
    return entry ? entry.flavor_text.replace(/\f/g, " ") : "No Discription available.";
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

function getMoves(pokemon) {
    let moves = [];
    for (let i = 0; i < Math.min(10, pokemon.moves.length); i++) {
        moves.push(`<span class="move">${pokemon.moves[i].move.name}</span>`);
    }
    return moves.join("");
}

async function fetchEvolutionChain(speciesData) {
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

async function getEvolutionPictures(chain) {
    const result = [];
    let current = chain;
    while (current) {
        const pokemon = await getEvolutionPokemon(current.species.name);
        result.push(createEvolutionPicture(pokemon));
        current = current.evolves_to[0];
    }
    return result;
}

async function getEvolutionPokemon(name) {
    let pokemon = allPokeData.find(p => p.name === name);
    if (!pokemon) {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        pokemon = await response.json();
    }
    return pokemon;
}

function createEvolutionPicture(pokemon) {
    return {
        name: pokemon.name,
        img: getPokemonImage(pokemon)
    };
}

function createEvolutionTemplate(dialogData) {
    let evolutionTemplate = "";
    for (let i = 0; i < dialogData.evolutionChain.length; i++) {
        evolutionTemplate += renderEvolutionStage(dialogData.evolutionChain[i]);
        if (i < dialogData.evolutionChain.length - 1) {
            evolutionTemplate += `<div class="evolution-arrow">➜</div>`;
        }
    }
    return evolutionTemplate;
}