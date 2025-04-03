/* function copyTheArray(array1, array2) {
    for (let index = 0; index < array1.length; index++) {
        const element = array1[index];
        array2 = element;
    }
} */


function standardgameState() {
    gameState.currentWildPokemonInBattle = null;
    gameState.userSelectedPokemonHtml = '';
    gameState.trainersPokemonHtml = '';
    gameState.clickEnabled = true;
    gameState.fightStatus = false;
    gameState.fightingAnotherTrainer = false;
    gameState.haveUserSelectedPokemon = false;
    gameState.hasTheBattleBeenWon = false;
    gameState.currentPokemonFightingAgainstHtml = '';
    gameState.battleText = '';
    gameState.userTurnInBattle = true;
    gameState.availablePokemons = model.data.allPokemons.map(pokemon => ({ ...pokemon }));
    gameState.userPokemonForBattle = null;
    updateView();
}

function catchPokemon() {
    gameState.pokemonsTheUserHasCaught.push(gameState.availablePokemons[gameState.randomNumber])

    standardgameState();
    updateView();
}

function healThePokemon(index) {
    const findPokemon = model.data.allPokemons.find(({ name }) => name == gameState.pokemonsTheUserHasCaught[index].name)
    gameState.pokemonsTheUserHasCaught[index].hp = findPokemon.hp;
    createTheTrainersPokemonHtml();
    updateView();
}

function fightRandomPokemon() {
    standardgameState();
    gameState.copyOfUserPokemons = gameState.pokemonsTheUserHasCaught.map(pokemon => ({ ...pokemon }))
    gameState.availablePokemons = model.data.allPokemons.map(pokemon => ({ ...pokemon }));
    //gameState.availablePokemons = [...model.data.allPokemons]
    /* copyTheArray(model.data.allPokemons, gameState.availablePokemons) */
    /* 
    gameState.availablePokemons = [...model.data.allPokemons]; */
    gameState.randomNumber = Math.floor(Math.random() * gameState.availablePokemons.length);
    gameState.currentWildPokemonInBattle = gameState.availablePokemons[gameState.randomNumber];

    setTimeout(() => {
        alert(gameState.availablePokemons[gameState.randomNumber].name + ' wants to fight');
        gameState.fightStatus = true;
        createWildPokemonHtml();
        updateView();
    }, 500);
}

function selectPokemonForFight(arrayId) {
    gameState.haveUserSelectedPokemon = true;
    gameState.trainersPokemonHtml = [];
    gameState.userPokemonForBattle = gameState.pokemonsTheUserHasCaught[arrayId];
    createTrainersPokemonForBattleHtml();
    updateView();
}

function fightEnemyTrainer() {
    createTheEnemyTrainersPokemonHtml();
    gameState.fightStatus = true;
    gameState.fightingAnotherTrainer = true;
    updateView();
}

function runAwayFromBattle() {
    standardgameState();
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
        }, 3000);
    }
    if (gameState.userPokemonForBattle.hp <= 0) {
        gameState.battleText = 'Wild ' + gameState.currentWildPokemonInBattle.name + (' has won')
        gameState.hasTheBattleBeenWon = true;
        setTimeout(() => {
            standardgameState();
        }, 3000);
    }
    updateView();

}

function enemyPokemonAttack() {
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
}

function userPokemonAttack() {
    //User attack
    if (gameState.hasTheBattleBeenWon) {
        return
    } else {
        let attackNumber;
        attackNumber = Math.floor(Math.random(10 - 1) * gameState.userPokemonForBattle.level) + 1;
        gameState.currentWildPokemonInBattle.hp = gameState.currentWildPokemonInBattle.hp - attackNumber;
        gameState.battleText = gameState.userPokemonForBattle.name + ' hit for ' + attackNumber;
        gameState.clickEnabled = false;
        checkBattleStatus();
        createWildPokemonHtml();
        enemyPokemonAttack();
        updateView();
        console.log(attackNumber)
    }

}



