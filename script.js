
async function init() {
    showLoadingSpinner();

    await fetchAllPokeData();



    filteredPokemon = allPokeData;

    renderPokeCard();
    hideLoadingSpinner();
    fetchSearchBase();



}

let dialogCache = {};
let currentPokemonId = null;



function renderPokeCard() {

    const pokeCard = document.getElementById('poke-card-container');
    pokeCard.innerHTML = "";
    let html = "";

    for (let index = 0; index < filteredPokemon.length; index++) {
        html += renderMain(filteredPokemon[index]);
    }

    pokeCard.innerHTML = html;
}

async function loadMore() {
    if (offset + limit >= 151) {
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



async function searchPokemon() {

    const searchValue = document
        .getElementById("search-input")
        .value
        .toLowerCase()
        .trim();

    if (searchValue.length < 3) {
        filteredPokemon = allPokeData;
        renderPokeCard();
        return;
    }

    const matches = searchBaseData.filter(p =>
        p.name.includes(searchValue)
    );

    filteredPokemon = [];

    for (const pokemon of matches) {

        let loaded = allPokeData.find(p => p.name === pokemon.name);

        if (!loaded) {
            const response = await fetch(pokemon.url);
            loaded = await response.json();
        }

        filteredPokemon.push(loaded);
    }

    renderPokeCard();
}

const dialog = document.getElementById('dialog-window');

async function openDialogById(id) {
    let pokemon = allPokeData.find(p => p.id === id);


    if (!pokemon) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        pokemon = await response.json();
    }

    openDialog(pokemon);
}

async function openDialog(pokemon) {
    currentPokemonId = pokemon.id;
    dialog.showModal();
    document.body.classList.add("dialog-open");
    document.body.classList.add("no-scroll");

    renderDialogPokemon(pokemon);

    if (!dialogCache[pokemon.id]) {
        dialogCache[pokemon.id] = await buildDialogData(pokemon);
    }

    renderDialogPokemonAbout(dialogCache[pokemon.id]);

}

function closeDialog() {
    dialog.close();
    document.body.classList.remove("dialog-open");
    document.body.classList.remove("no-scroll");
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
    getStatBar("progress-line-hp", dialogData.stats.hp);
    getStatBar("progress-line-attack", dialogData.stats.attack);
    getStatBar("progress-line-defense", dialogData.stats.defense);
    getStatBar("progress-line-special-attack", dialogData.stats.specialAttack);
    getStatBar("progress-line-special-defense", dialogData.stats.specialDefense);
    getStatBar("progress-line-speed", dialogData.stats.speed);
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

function getStatBar(id, value) {
    document.getElementById(id).style.width = `${value / 2}%`;
}
