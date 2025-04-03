// Model

// View
function updateView() {
    const html = /*HTML*/`
    <div class="game-container">
        <div class="control-buttons">
            ${gameState.fightStatus ?
            `${gameState.fightingAnotherTrainer ?
                `<button onclick="runAwayFromBattle()">Run Away</button>` :
                `<button onclick="catchPokemon()">Catch the Pokemon</button>`
            }
                <button onclick="createTheTrainersPokemonHtml()">Select Pokemon</button>
                ` :
            `<button ${gameState.clickEnabled ? `onclick="fightRandomPokemon()"` : ''}>Go into the grass</button>
                <button ${gameState.clickEnabled ? 'onclick="createTheTrainersPokemonHtml()"' : ''}>View my pokemon</button>
                <button ${gameState.clickEnabled ? 'onclick="fightEnemyTrainer()"' : ''}>Fight another trainer</button>`
        }
        </div>
        ${gameState.fightStatus ? `
            <div class="battle-area">
                ${gameState.haveUserSelectedPokemon ? `
                    <div class="battle-text">
                        ${gameState.battleText ?? ''}
                    </div>
                    ${gameState.currentPokemonFightingAgainstHtml ? `
                        <div class="wild-pokemon">
                            ${gameState.fightingAnotherTrainer ?
                        `${gameState.enemyTrainersPokemonHtml}` :
                        `${gameState.currentPokemonFightingAgainstHtml}`
                    }
                        </div>` : '<div></div>'
                }
                ` : ''}
            </div>` : ''
        }
        <div class="trainers-pokemon"> 
            ${gameState.trainersPokemonHtml ?? ''}
        </div>
        <div class="trainers-area">
            <div class="user-trainer">
                <div>name: ${model.data.allTrainers[0].name}</div> 
                <img src="${model.data.allTrainers[0].img}" alt=""> 
            </div>
            ${gameState.fightingAnotherTrainer && gameState.fightStatus ? /*HTML*/`
                <div class="enemy-trainer">
                    <div>name: ${model.data.allTrainers[1].name}</div>
                    <img src="${model.data.allTrainers[1].img}" alt="">
                </div>
            ` : ''}
        </div>
    </div>`;
    app.innerHTML = html;
}

function createStandardHtml(cssClass, functionName, arrayName, index) {
    return /*HTML*/`
    <div onclick="${functionName}" class="${cssClass}">
        <div>${arrayName.name}</div>
        <img src="${arrayName.img}">
        <div>Level: ${arrayName.level}</div>
        <div>Hp: ${arrayName.hp}</div>
        ${!gameState.fightStatus ? `<button onclick="healThePokemon(${index})"> heal</button>` : ''} 
    </div>
    `
}

function createTheEnemyTrainersPokemonHtml() {
    gameState.enemyTrainersPokemonHtml = model.data.enemyTrainersPokemons.map((pokemon, index) => `
    ${createStandardHtml('pokemon-card', '', pokemon, index)}
    `).join('');
}
function createWildPokemonHtml() {
    gameState.currentPokemonFightingAgainstHtml = /*HTML*/`
    ${createStandardHtml('pokemon-card', '', gameState.currentWildPokemonInBattle)}
    `
}

function createTheTrainersPokemonHtml() {
    console.log(gameState.pokemonsTheUserHasCaught)
    if (gameState.pokemonsTheUserHasCaught.length === 0) {
        gameState.pokemonsTheUserHasCaught = [{ ...model.data.allPokemons.find(pokemon => pokemon.name === 'Pikachu') }];
    }
    if (!gameState.fightStatus) {
        gameState.trainersPokemonHtml = gameState.pokemonsTheUserHasCaught.map((pokemon, index) => `
            ${createStandardHtml('pokemon-card', '', pokemon, index)}
        `).join('');
    } else {
        gameState.trainersPokemonHtml = gameState.pokemonsTheUserHasCaught.map((pokemon, index) => /*HTML*/`
            ${createStandardHtml('pokemon-card', `selectPokemonForFight(${index})`, pokemon)}
        `).join('');
    }

    updateView();
}

function createTrainersPokemonForBattleHtml() {
    gameState.userSelectedPokemonHtml = /*HTML*/`
    ${createStandardHtml('pokemon-card', '', gameState.userPokemonForBattle)}
    
    `
}


