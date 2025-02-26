function standardgameState() {
    gameState.currentWildPokemonInBattle = null;
    gameState.userSelectedPokemonHtml = '';
    gameState.trainersPokemonHtml = '';
    gameState.clickEnabled = true;
    gameState.fightStatus = false;
    gameState.haveUserSelectedPokemon = false;
    gameState.hasTheBattleBeenWon = false;
    gameState.currentPokemonFightingAgainstHtml = '';
    gameState.battleText = '';
    gameState.userTurnInBattle = true;
    gameState.availablePokemons = [...model.data.allPokemons];
    gameState.showCasePokemon = [...gameState.pokemonsTheUserHasCaught];
    gameState.userPokemonForBattle = null;
    updateView();
}

function catchPokemon() {
    gameState.pokemonsTheUserHasCaught.push(gameState.availablePokemons[randomNumber])
    standardgameState();
    updateView();
}

function healThePokemon(index) {
    gameState.showCasePokemon[index].hp = gameState.pokemonsTheUserHasCaught.hp;
    createTheTrainersPokemonHtml();
    updateView();
}

function fightRandomPokemon() {
    standardgameState();
    gameState.availablePokemons = [...model.data.allPokemons];
    randomNumber = Math.floor(Math.random() * gameState.availablePokemons.length);
    gameState.currentWildPokemonInBattle = gameState.availablePokemons[randomNumber];

    setTimeout(() => {
        alert(gameState.availablePokemons[randomNumber].name + ' wants to fight');
        gameState.fightStatus = true;
        createWildPokemonHtml();
        updateView();
    }, 500);
}

function selectPokemonForFight(arrayId) {
    gameState.haveUserSelectedPokemon = true;
    gameState.trainersPokemonHtml = [];
    gameState.userPokemonForBattle = gameState.showCasePokemon[arrayId];
    createTrainersPokemonForBattleHtml();
    updateView();
}


function checkBattleStatus() {
    if (gameState.hasTheBattleBeenWon) {
        return
    }
    if (gameState.currentWildPokemonInBattle.hp <= 0) {
        gameState.battleText = model.data.allTrainers[0].name + ' and ' + gameState.userPokemonForBattle.name + ' has won'
        gameState.hasTheBattleBeenWon = true;
        gameState.userPokemonForBattle.level = gameState.userPokemonForBattle.level += 1;
        setTimeout(() => {
            standardgameState();
        }, 2000);
    }
    if (gameState.userPokemonForBattle.hp <= 0) {
        gameState.battleText = 'Wild ' + gameState.currentWildPokemonInBattle.name + (' has won')
        gameState.hasTheBattleBeenWon = true;
        setTimeout(() => {
            standardgameState();
        }, 2000);
    }
    updateView();

}

function pokemonAttack() {
    //User attack
    if (gameState.hasTheBattleBeenWon) {
        return
    }
    let attackNumber;
    attackNumber = Math.floor(Math.random(10 - 1) * gameState.userPokemonForBattle.level) + 1;
    gameState.currentWildPokemonInBattle.hp = gameState.currentWildPokemonInBattle.hp - attackNumber;
    gameState.battleText = gameState.userPokemonForBattle.name + ' hit for ' + attackNumber;
    gameState.clickEnabled = false;
    createWildPokemonHtml();
    // wild pokemon attack
    setTimeout(() => {
        if (gameState.hasTheBattleBeenWon) {
            return
        } else {
            attackNumber = Math.floor(Math.random(10 - 1) * gameState.currentWildPokemonInBattle.level) + 1;
            gameState.userPokemonForBattle.hp = gameState.userPokemonForBattle.hp - attackNumber;
            gameState.battleText = gameState.currentWildPokemonInBattle.name + ' hit for ' + attackNumber;
            gameState.clickEnabled = true;
            createTrainersPokemonForBattleHtml();
            updateView();
            checkBattleStatus();

        }
    }, 1000);
    updateView();
    checkBattleStatus();
    console.log(attackNumber)

}



