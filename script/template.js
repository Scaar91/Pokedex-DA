

function renderMain(pokemon) {
    return ` <section class="poke-card card-color-${pokemon.types[0].type.name}">
                <div class="poke-card-headline">
                    <div class="poke-card-name"><h2>${pokemon.name}</h2></div>
                    <div class="poke-card-number"><h2>#${pokemon.id}</h2></div>               
                </div>
                <button data-id="card" onclick="openDialog(allPokeData[${pokemon.id - 1}])" class="poke-card-type-container">
                    <div class="poke-card-types"><h3 class="poke-card-type uppercase type-color-${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</h3>
                        ${pokemon.types[1]
            ? `<h3 class="poke-card-type uppercase type-color-${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</h3>`
            : ""
        }
                    </div>
                 <img data-id="card-image" class="card-color-${pokemon.types[0].type.name} poke-card-pic" 
                 src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                </button>
             </section>
    `
}

function renderDialog(pokemon) {
    return `<section data-id="overlay-pokemon-name">
                <section id="dialog-section-top" class="card-color-${pokemon.types[0].type.name}">
                    <div class="dialog-headline">
                       <button data-id="close-dialog-button" onclick="closeDialog()" class="close-dialog-btn"><img src="./assets/icons/close.png" alt="Dialog closeing Button"></button>                   
                            <div class="dialog-poke-name-type-number">
                                <div class="dialog-poke-name-type">
                                    <div class="dialog-poke-name uppercase"">${pokemon.name}</div> 
                                    <div class="dialog-poke-type">
                                        <div class="dialog-type uppercase type-color-${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</div>
                                        ${pokemon.types[1]
                                        ? `<div class="dialog-type uppercase type-color-${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</div>`
                                        : ""
                                        }
                                    </div>
                                </div>
                                <div class="dialog-poke-number">#${pokemon.id}</div>
                            </div>                       
                   </div>                   
                   <img data-id="dialog-image" class="dialog-poke-img" 
                    src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                </section>
                <section id="dialog-section-bottom">
                    <div class="dialog-section-bottom-headline">
                            <button class="dialog-tab" onclick="renderDialogPokemonAbout(allPokeData[${pokemon.id - 1}]);"><h3>About</h3></button>
                            <button class="dialog-tab" onclick="renderDialogPokemonBaseStats(allPokeData[${pokemon.id - 1}]);"><h3>Base Stats</h3></button>
                            <button class="dialog-tab" onclick="renderDialogPokemonEvolution(allPokeData[${pokemon.id - 1}]);"><h3>Evolution</h3></button>
                            <button class="dialog-tab" onclick="renderDialogPokemonMoves(allPokeData[${pokemon.id - 1}]);"><h3>Moves</h3></button>
                    </div>
                    <section id="dialog-container-stats"></section>
                    <div class="nav-buttons">
                        <button class= "nav-btn"> <img src="./assets/icons/arrow-left.svg" alt="arrow left"></button>
                        <button class= "nav-btn"> <img src="./assets/icons/arrow-right.svg" alt="arrow right"></button>
                    </div>
                                        

                    
                         
                 </section>
                 
            </section>
            `
}

function renderDialogAbout(data) {
    return `<table>
              <tr>
                <th>Species</th>
                <td>${data.genus}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>${data.height}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>${data.weight}</td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>${data.abilities}</td>
              </tr>   
            </table>
            `
}

function renderDialogBaseStats(data) {
    return `<table>
              <tr>
                <th>HP</th>
                <td>${data.stats.hp}</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>P</td>
              </tr>
              <tr>
                <th>Defense</th>
                <td>P</td>
              </tr>
              <tr>
                <th>Special Attack</th>
                <td>Placeholder</td>
              </tr>
              <tr>
                <th>Special Defense</th>
                <td>Placeholder</td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>Placeholder</td>
              </tr>     
            </table>
            `
}

function renderDialogEvolution(pokemon) {
    return `Test52`
}

function renderDialogMoves(pokemon) {
    return `Test3`
}