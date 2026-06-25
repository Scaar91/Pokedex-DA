
async function init() {
    showLoadingSpinner();
    await fetchDataJson();
    await fetchPokeData();
    filteredPokemon = allPokeData;
    renderPokeCard();
}


let currentAmount = 20

function renderPokeCard() {

    const pokeCard = document.getElementById('poke-card-container');
    pokeCard.innerHTML = "";
    for (let index = 0; index < currentAmount; index++) {
        pokeCard.innerHTML += renderMain(filteredPokemon[index]);
    }
}

function loadMore() {
    currentAmount += 10;
    renderPokeCard();
}

function showLoadingSpinner() {
    document.getElementById('loading-spinner').innerHTML =
    '<img src="./img/pokeloading.svg" alt="jumping Pokeball">';
}

function searchPokemon() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();

    filteredPokemon = allPokeData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    renderPokeCard();
}

const dialog = document.getElementById('dialog-window');

function openDialog(pokemon) {
    dialog.showModal();
    document.body.classList.add("dialog-open");

    renderDialogPokemon(pokemon);
    renderDialogPokemonAbout(pokemon);
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

function renderDialogPokemonAbout(pokemon) {
    const dialogPokemonAbout = document.getElementById('dialog-container-stats');
    dialogPokemonAbout.innerHTML = "";
    dialogPokemonAbout.innerHTML = renderDialogAbout(pokemon);
}

function renderDialogPokemonBaseStats(pokemon) {
    const dialogPokemonBaseStats = document.getElementById('dialog-container-stats');
    dialogPokemonBaseStats.innerHTML = "";
    dialogPokemonBaseStats.innerHTML = renderDialogBaseStats(pokemon);
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


