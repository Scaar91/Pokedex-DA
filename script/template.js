

function renderMain(pokemon) {
    return ` <section class="poke-card card-color-${pokemon.types[0].type.name}">
                <div class="poke-card-headline">
                    <div class="poke-card-number"><h2>#${pokemon.id}</h2></div>
                    <div class="poke-card-name"><h2>${pokemon.name}</h2></div>
                </div>
                <button class="card-color-${pokemon.types[0].type.name}" onclick="openDialog(allPokeData[${pokemon.id}])"><img class="poke-card-pic" 
                src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"></button>
                <div class="poke-card-footer">
                    <div class="poke-card-typ"><h3>${pokemon.types[0].type.name}</h3></div>
                        ${pokemon.types[1]
                        ? `<span><h3>${pokemon.types[1].type.name}</h3></span>`
                        : ""
                        }

                </div>
             </section>
    `
}

function renderDialog(pokemon) {
    return `<section>
                <div class="dialog-headline">
                    <div class="dialog-poke-number">#${pokemon.id}</div>
                    <div class="dialog-poke-name">${pokemon.name}</div>                 
                </div>
                <section class="dialog-main">
                    <img class="poke-card-pic card-color-${pokemon.types[0].type.name}" 
                          src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                         <div class="dialog-poke-mass">
                            <h2>Type</h2>
                            <div class="dialog-poke-type">
                                <div class="dialog-type">${pokemon.types[0].type.name}</div>
                                ${pokemon.types[1]
                                ? `<span class="dialog-type">${pokemon.types[1].type.name}</span>`
                                   : ""
                                }
                            </div>
                            <h2>Height</h2>
                            <div class="dialog-poke-height">${pokemon.height}m</div>
                            <h2>Weight</h2>
                            <div class="dialog-poke-weight">${pokemon.weight}kg</div>
                         </div>
                 </section>
                 <section class="dialog-stats">
                 </section>
            </section>
               `
}