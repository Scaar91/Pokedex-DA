

function renderMain(pokemon) {
    return ` <section class="poke-card card-color-${pokemon.types[0].type.name}">
                <div class="poke-card-headline">
                    <div class="poke-card-number"><h2>#${pokemon.id}</h2></div>
                    <div class="poke-card-name"><h2>${pokemon.name}</h2></div>
                </div>
                <div class="poke-card-typ-container">
                    <div class="poke-card-typ"><h3>${pokemon.types[0].type.name}</h3>
                        ${pokemon.types[1]
            ? `<h3>${pokemon.types[1].type.name}</h3>`
            : ""
        }
                    </div>
                 <button class="card-color-${pokemon.types[0].type.name}" onclick="openDialog(allPokeData[${pokemon.id}])"><img class="poke-card-pic" 
                 src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"></button>

                </div>
             </section>
    `
}

function renderDialog(pokemon) {
    return `<section>
                <section id="dialog-section-top"
                    <div class="dialog-headline">
                       <button onclick="closeDialog()" class="close-dialog-btn"><img src="./assets/icons/close.png" alt="Dialog closeing Button"></button>                   
                            <div class="dialog-poke-name-type-number">
                                <div class="dialog-poke-name-type">
                                    <div class="dialog-poke-name">${pokemon.name}</div> 
                                    <div class="dialog-poke-type">
                                        <div class="dialog-type">${pokemon.types[0].type.name}</div>
                                        ${pokemon.types[1]
                                        ? `<span class="dialog-type">${pokemon.types[1].type.name}</span>`
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
                            <h3>About</h3>
                            <h3>Base Stats</h3>
                            <h3>Evolutuion</h3>
                            <h3>Moves</h3>
                    </div>
                    <section id="dialog-container-stats"></section>

                    
                         
                 </section>
                 
            </section>
            `
}

function renderDialogAbout(pokemon) {
    return `<table>
              <tr>
                <td>Species</th>
                <td>Placeholder Seed</th>
              </tr>
              <tr>
                <td>Height</th>
                <td>Placeholder</th>
              </tr>
              <tr>
                <td>Weight</th>
                <td>Placeholder</th>
              </tr>
              <tr>
                <td>Abilities</th>
                <td>Placeholder</th>
              </tr>

    
    
            </table>
            `
}

function renderDialogBaseStats(pokemon) {
    return ``
}

function renderDialogEvolution(pokemon) {
    return ``
}

function renderDialogMoves(pokemon) {
    return ``
}