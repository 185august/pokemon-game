// Model

// View
function updateView() {
    html = /*HTML*/`
    <div class="game-container">
        <div class="control-buttons">
            ${gameState.fightStatus ?
            `<button ${gameState.clickEnabled ? 'onclick="catchPokemon()"' : ''}> Catch the pokemon</button>
                <button ${gameState.clickEnabled ? 'onclick="createTheTrainersPokemonHtml()"' : ''}> Select Pokemon</button>`
            :
            `<button ${gameState.clickEnabled ? `onclick="fightRandomPokemon()"` : ''}>Go into the grass</button>
                <button ${gameState.clickEnabled ? 'onclick="createTheTrainersPokemonHtml()"' : ''}>View my pokemon</button>`
        }
        </div>
        ${gameState.fightStatus ? `
        <div class="battle-area">
            ${gameState.haveUserSelectedPokemon ? `
                <div class="selected-pokemon">
                    ${gameState.userSelectedPokemonHtml}
                    ${gameState.clickEnabled ? `<button onclick="userPokemonAttack()" >attack</button>` : ''}
                </div>`: `<div></div>`}
                <div class="battle-text">
                ${gameState.battleText ?? ''}
                </div>
            ${gameState.currentPokemonFightingAgainstHtml ? `
                <div class="wild-pokemon">
                    ${gameState.currentPokemonFightingAgainstHtml}
                </div>` : '<div></div>'}
        </div>`: ''}
        

        <div class="trainers-pokemon"> 
        ${gameState.trainersPokemonHtml ?? ''}
        </div>
        <div class="trainer">
            <div>name: ${model.data.allTrainers[0].name}</div> 
            <img src="${model.data.allTrainers[0].img}" alt=""> 
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
function createWildPokemonHtml() {
    gameState.currentPokemonFightingAgainstHtml = /*HTML*/`
    ${createStandardHtml('pokemon-card', '', gameState.currentWildPokemonInBattle)}
    `
}

function createTheTrainersPokemonHtml() {
    gameState.showCasePokemon = gameState.pokemonsTheUserHasCaught.map(pokemon => pokemon)
    if (!gameState.fightStatus) {
        gameState.trainersPokemonHtml = gameState.showCasePokemon.map((pokemon, index) => `
    ${createStandardHtml('pokemon-card', '', pokemon, index)}
    `).join('');
    }
    else {
        gameState.trainersPokemonHtml = gameState.showCasePokemon.map((pokemon, index) => /*HTML*/`
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


