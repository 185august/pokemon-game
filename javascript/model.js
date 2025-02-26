const model = {
    app: {
        app: document.getElementById('app'),
    },
    input: {
        gameState: {
            haveUserSelectedPokemon: false,
            currentWildPokemonInBattle: null,
            userSelectedPokemonHtml: '',
            trainersPokemonHtml: '',
            clickEnabled: true,
            fightStatus: false,
            hasTheBattleBeenWon: false,
            currentPokemonFightingAgainstHtml: '',
            battleText: '',
            userTurnInBattle: true,
            availablePokemons: [],
            pokemonsTheUserHasCaught: [],
            userPokemonForBattle: null,
            randomNumber: '',
            copyOfUserPokemons: []
        },
    },
    data: {
        allPokemons: [
            { name: 'Pikachu', level: 25, img: 'img/pokemon1.png', hp: 100 },
            { name: 'Squirtle', level: 15, img: 'img/pokemon2.png', hp: 50 },
            { name: 'Charmander', level: 20, img: 'img/pokemon3.png', hp: 75 },
            { name: 'Evee', level: 13, img: 'img/pokemon4.png', hp: 40 },
            { name: 'Bulbasour', level: 15, img: 'img/pokemon5.png', hp: 50 },
            { name: 'Jigglypuff', level: 30, img: 'img/pokemon6.png', hp: 120 },
            { name: 'Meowth', level: 20, img: 'img/pokemon7.png', hp: 75 },
            { name: 'Psyduck', level: 20, img: 'img/pokemon8.png', hp: 78 },
            { name: 'Dragonair', level: 42, img: 'img/pokemon9.png', hp: 150 },
            { name: 'Snorlax', level: 50, img: 'img/pokemon10.png', hp: 250 },
        ],
        allTrainers: [
            { name: 'Ash', img: 'img/pokemonTrainerIdle.png' },
        ]
    },
}
//global gameState varibel for å gjøre koden litt mindre rotete
const gameState = model.input.gameState;


