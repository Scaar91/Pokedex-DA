
async function init() {
    showLoadingSpinner();
    
    await fetchAllPokeData();
    filteredPokemon = allPokeData;
    renderPokeCard();
    
    
    
}

let dialogCache = {};



function renderPokeCard() {

    const pokeCard = document.getElementById('poke-card-container');
    pokeCard.innerHTML = "";
    for (let index = 0; index < filteredPokemon.length; index++) {
        pokeCard.innerHTML += renderMain(filteredPokemon[index]);
    }
}

async function loadMore() {
    
    offset += 20;

    await fetchAllPokeData();

    filteredPokemon = allPokeData;
    renderPokeCard();
}

function showLoadingSpinner() {
    document.getElementById('loading-spinner').innerHTML =
    '<img src="./assets/img/pokeloading.svg" alt="jumping Pokeball">';
}

function searchPokemon() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();

    filteredPokemon = allPokeData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    renderPokeCard();
}

const dialog = document.getElementById('dialog-window');

async function openDialog(pokemon) {
    dialog.showModal();
    document.body.classList.add("dialog-open");

    renderDialogPokemon(pokemon);

    if (!dialogCache[pokemon.id]) {
        dialogCache[pokemon.id] = await buildDialogData(pokemon);
    }

    renderDialogPokemonAbout(dialogCache[pokemon.id]);
    
}

function closeDialog() {
  dialog.close();
  document.body.classList.remove("dialog-open");
}


function renderDialogPokemon(pokemon) {
    const dialogPokemon = document.getElementById('dialog-window');
    dialogPokemon.innerHTML = "";
    dialogPokemon.innerHTML = renderDialog(pokemon);
}

function renderDialogPokemonAbout(dialogData) {
    const dialogPokemonAbout = document.getElementById('dialog-container-stats');
    dialogPokemonAbout.innerHTML = "";
    dialogPokemonAbout.innerHTML = renderDialogAbout(dialogData);
}

function renderDialogPokemonBaseStats(dialogData) {
    const dialogPokemonBaseStats = document.getElementById('dialog-container-stats');
    dialogPokemonBaseStats.innerHTML = "";
    dialogPokemonBaseStats.innerHTML = renderDialogBaseStats(dialogData);
}

function renderDialogPokemonEvolution(pokemon) {
    const dialogPokemonEvolution = document.getElementById('dialog-container-stats');
    dialogPokemonEvolution.innerHTML = "";
    dialogPokemonEvolution.innerHTML = renderDialogEvolution(pokemon);
}

function renderDialogPokemonMoves(pokemon) {
    const dialogPokemonMoves = document.getElementById('dialog-container-stats');
    dialogPokemonMoves.innerHTML = "";
    dialogPokemonMoves.innerHTML = renderDialogMoves(pokemon);
}


