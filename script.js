async function init() {
    showLoadingSpinner();

    fetchSearchBase(); 

    await fetchAllPokeData(); 

    filteredPokemon = allPokeData;

    renderPokeCard(); 
    hideLoadingSpinner();
}

let dialogCache = {};
let currentPokemonId = null;



function renderPokeCard() {

    const pokeCard = document.getElementById('poke-card-container');
    pokeCard.innerHTML = "";
    for (let index = 0; index < filteredPokemon.length; index++) {
        pokeCard.innerHTML += renderMain(filteredPokemon[index]);
    }
}

async function loadMore() {
    if (offset + limit >=151){
        return;
    }
    showLoadingSpinner();
    
    offset += limit;

    await fetchAllPokeData();

    filteredPokemon = allPokeData;

    renderPokeCard();
    hideLoadingSpinner();
}

function showLoadingSpinner() {
    document.getElementById('loading-spinner').innerHTML =
    '<img class="loading-spinner-img" src="./assets/img/pokeloading.svg" alt="jumping Pokeball">';
    document.getElementById('load-button').disabled = true
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').innerHTML = "";
    document.getElementById('load-button').disabled = false
}



function searchPokemon() {
    
    const searchValue = document.getElementById('search-input').value.toLowerCase();
   
    filteredPokemon = searchBaseData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    if (filteredPokemon.length === 0) {
        document.getElementById('poke-card-container').innerHTML = '<h2 data-id="not-found">No Pokemon found!</h2>';
        return;
    }

    renderPokeCard();
}

const dialog = document.getElementById('dialog-window');

async function openDialog(pokemon) {
    currentPokemonId = pokemon.id;
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

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        closeDialog();
    }
});


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



async function showPreviousPokemon(currentId) {
    if (currentId <= 1) return;

    const previousPokemon = allPokeData.find(p => p.id === currentId - 1);

    if (previousPokemon) {
        await openDialog(previousPokemon);
    }
}

async function showNextPokemon(currentId) {
    const nextPokemon = allPokeData.find(p => p.id === currentId + 1);

    if (nextPokemon) {
        await openDialog(nextPokemon);
    }
}


document.addEventListener("keydown", arrowKeys);

function arrowKeys(event) {
    if (!currentPokemonId) return;

    if (event.key === "ArrowLeft") {
        showPreviousPokemon(currentPokemonId);
    }

    if (event.key === "ArrowRight") {
        showNextPokemon(currentPokemonId);
    }
}

