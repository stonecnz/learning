// button animation
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
    btn.addEventListener('mousedown', function() {
        btn.classList.add('playing');
    });
    btn.addEventListener('mouseup', function() {
        btn.classList.remove('playing');
    });
});

// requests the users input - contains a fail safe in case the user is silly

function playerInput() {
    let correctInput = false;
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

// run the whole thing for 5 rounds and declare an overall winner
function game() {
    let computerTotal = 0;
    let playerTotal = 0;
    for (let i = 0; i<5; i++) {
        let comp = computerPlay();
        let user = playerInput();
        console.log(user);
        let result = playARound(user, comp);
        if (result === 0) {
            console.log("The first game was a draw!");
        } else if (result === 1) {
            playerTotal ++;
            console.log("You won a game!");
        } else {
            console.log("You lost a game!");
            computerTotal ++;
        }
    }       
    if (playerTotal === computerTotal) {
        console.log("All games ended in a draw...");
    } else if (playerTotal > computerTotal) {
        console.log("All games ended with you winning!");
    } else {
        console.log("All games ended with the computer winning... sad-face!");
    }
}
// game();