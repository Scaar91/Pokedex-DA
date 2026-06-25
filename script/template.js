

function renderMain(pokemon) {
    return ` <section class="poke-card card-color-${pokemon.types[0].type.name}">
                <div class="poke-card-headline">
                    <div class="poke-card-name"><h2>${pokemon.name}</h2></div>
                    <div class="poke-card-number"><h2>#${pokemon.id}</h2></div>               
                </div>
                <div class="poke-card-type-container">
                    <div class="poke-card-types"><h3 class="poke-card-type uppercase type-color-${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</h3>
                        ${pokemon.types[1]
            ? `<h3 class="poke-card-type uppercase type-color-${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</h3>`
            : ""
        }
                    </div>
                 <button class="card-color-${pokemon.types[0].type.name}" onclick="openDialog(allPokeData[${pokemon.id - 1}])"><img class="poke-card-pic" 
                 src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"></button>

                </div>
             </section>
    `
}

function renderDialog(pokemon) {
    return `<section>
                <section id="dialog-section-top" class="card-color-${pokemon.types[0].type.name}">
                    <div class="dialog-headline">
                       <button onclick="closeDialog()" class="close-dialog-btn"><img src="./assets/icons/close.png" alt="Dialog closeing Button"></button>                   
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
                   <img class="dialog-poke-img" 
                    src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                </section>
                <section id="dialog-section-bottom">
                    <div class="dialog-section-bottom-headline">
                            <a href="#" onclick="renderDialogPokemonAbout(allPokeData[${pokemon.id - 1}]);"><h3>About</h3></a>
                            <a href="#" onclick="renderDialogPokemonBaseStats(allPokeData[${pokemon.id - 1}]);"><h3>Base Stats</h3></a>
                            <a href="#" onclick="renderDialogPokemonEvolution(allPokeData[${pokemon.id - 1}]);"><h3>Evolution</h3></a>
                            <a href="#" onclick="renderDialogPokemonMoves(allPokeData[${pokemon.id - 1}]);"><h3>Moves</h3></a>
                    </div>
                    <section id="dialog-container-stats"></section>

                    
                         
                 </section>
                 
            </section>
            `
}

function renderDialogAbout(pokemon) {
    return `<table>
              <tr>
                <th>Species</th>
                <td>Placeholder Seed</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>${pokemon.height}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>${pokemon.weight}</td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>Placeholder</td>
              </tr>   
            </table>
            `
}

function renderDialogBaseStats(pokemon) {
    return `Test`
}

function renderDialogEvolution(pokemon) {
    return `Test52`
}

function renderDialogMoves(pokemon) {
    return `Test3`
}