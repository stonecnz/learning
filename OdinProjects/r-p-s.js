const prompt = require('prompt-sync')({sigint: true});

// requests the users input - contains a fail safe in case the user is silly
let correctInput = false;
function playerInput() {
    let userInput = '';
    while (!correctInput) {
        userInput = prompt('rock, paper, or scissors? ... ');
        userInput = userInput.toLowerCase();
        if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
            correctInput = true;
        } else {
            console.log('That was an incorrect input. Try again... ')
        }
    }
    return userInput
}

// generates a random number between 1-3 - each represents a move by the computer
function computerPlay() {
    let computerMove = '';
    randomNumber = Math.floor((Math.random() * 3) + 1);
    if (randomNumber === 1) {
        computerMove = 'rock';
    } else if (randomNumber === 2) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
    return computerMove;
}

// init the function to play a single round; take players input and computers input as params
function playARound(playersMove, computersMove) {

    // init an outcome variable - 0 = draw; 1 = win; 2 = lose
    let outcome = 0;

    // compare all possible combinations and update the outcome with the outcome
    if (playersMove === computersMove) {
        outcome = 0;
    } else if (playersMove === 'rock') {
        if (computersMove === 'paper') {
            outcome = 2;
        } else {
            outcome = 1;
        }
    } else if (playersMove === 'paper') {
        if (computersMove === 'scissors') {
            outcome = 2;
        } else {
            outcome = 1;
        }
    } else {
        if (computersMove === 'rock') {
            outcome = 2;
        } else {
            outcome = 1;
        } 
    }

    // return the outcome needed
    return outcome;
}

// a function that calls each individual input function, plays the game, and prints the results in human words
function declareWinner() {
    let comp = computerPlay();
    let user = playerInput();
    let result = playARound(user, comp);
    if (result === 0) {
        console.log("It was a draw!");
    } else if (result === 1) {
        console.log("You won!");
    } else {
        console.log("You lost!");
    }
}

// run the whole thing
declareWinner();