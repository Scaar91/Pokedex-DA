

function renderMain(pokemon) {
    return ` <button data-id="card"  onclick="openDialogById(${pokemon.id})" class="poke-card card-color-${pokemon.types[0].type.name}">

                <div class="poke-card-headline">
                    <div class="poke-card-name"><h2>${pokemon.name}</h2></div>
                    <div class="poke-card-number"><h2>#${pokemon.id}</h2></div>               
                </div>
                <section class="poke-card-type-container">
                    <div class="poke-card-types"><h3 class="poke-card-type uppercase type-color-${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</h3>
                        ${pokemon.types[1]
                        ? `<h3 class="poke-card-type uppercase type-color-${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</h3>`
                        : ""
                        }
                    </div>
                 <img data-id="card-image" class="card-color-${pokemon.types[0].type.name} poke-card-pic" 
                 src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                </section>
             </button>
    `
}

function renderDialog(pokemon, dialogData) {
    return `<section data-id="overlay-pokemon-name" id="dialog-container">
                <section id="dialog-section-top" class="card-color-${pokemon.types[0].type.name}">
                    <div class="dialog-headline">
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
                            <button data-id="close-dialog-button" onclick="closeDialog()" class="close-dialog-btn"><img src="./assets/icons/close.png" alt="Dialog closeing Button"></button>
                        </div>                       
                   </div>                   
                   <img data-id="dialog-image" class="dialog-poke-img" 
                    src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                </section>
                <section id="dialog-section-bottom">
                    <div class="dialog-section-bottom-headline">
                            <button class="dialog-tab" onclick="renderDialogPokemonAbout(dialogCache[${pokemon.id}])"><h3>About</h3></button>
                            <button class="dialog-tab" onclick="renderDialogPokemonBaseStats(dialogCache[${pokemon.id}]);"><h3>Base Stats</h3></button>
                            <button class="dialog-tab" onclick="renderDialogPokemonEvolution(dialogCache[${pokemon.id}]);"><h3>Evolution</h3></button>
                            <button class="dialog-tab" onclick="renderDialogPokemonMoves(dialogCache[${pokemon.id}]);"><h3>Moves</h3></button>
                    </div>
                    <section id="dialog-container-stats"></section>
                    <div class="nav-buttons">
                        <button data-id="prev-button" class= "nav-btn" onclick="showPreviousPokemon(${pokemon.id})"> <img src="./assets/icons/arrow-left.svg" alt="arrow left"></button>
                        <button data-id="next-button" class= "nav-btn" onclick="showNextPokemon(${pokemon.id})"> <img src="./assets/icons/arrow-right.svg" alt="arrow right"></button>
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
                <td class= "ability-container">${renderAbilities(data.abilities)}</td>
              </tr>   
            </table>
            `
}

function renderDialogBaseStats(dialogData) {
    return `<table>
              <tr>
                <th>HP</th>
                <td>${dialogData.stats.hp}</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>${dialogData.stats.attack}</td>
              </tr>
              <tr>
                <th>Defense</th>
                <td>${dialogData.stats.defense}</td>
              </tr>
              <tr>
                <th>Special Attack</th>
                <td>${dialogData.stats.specialAttack}</td>
              </tr>
              <tr>
                <th>Special Defense</th>
                <td>${dialogData.stats.specialDefense}</td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>${dialogData.stats.speed}</td>
              </tr>     
            </table>
            `
}

function renderDialogEvolution(dialogData) {
    return `
        <section id="evolution">
            ${createEvolutionTemplate(dialogData)}
        </section>
    `;
}

function renderEvolutionStage(pokemon) {
    return `
        <div class="evolution-stage">
            <h6>
                <div class="evolution-name uppercase">
                    ${pokemon.name}
                </div>
            </h6>
            <div class="evolution-circle">
                <img class="evolution-pic" src="${pokemon.img}">
            </div>
        </div>
    `;
}

function renderDialogMoves(dialogData) {
      return `
        <div class="moves-container">
            ${dialogData.moves}
        </div>
    `;
}