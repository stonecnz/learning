let playersMove = '';
let runningTotal = 0;
let roundNum = 0;

const btns = document.querySelectorAll('.btn'); // select the buttons
const currentRound = document.querySelector('.current-round'); // selects the current round element

btns.forEach((btn) => { // add functionality to each button
    btn.addEventListener('mousedown', function() {
        btn.classList.add('playing'); // makes an animation when you select the button

        playersMove = btn.id; // inputs the player's move
        
        roundNum += 1; // increments the round each time the player clicks a button
        currentRound.innerHTML = roundNum; // displays the new round
    });
    btn.addEventListener('mouseup', function() {
        btn.classList.remove('playing');
    });
});





// generates a random number between 1-3 - each represents a move by the computer
function genCompMove() {
    let computerMove = '';
    randomNumber = Math.floor((Math.random() * 3) + 1);
    if (randomNumber === 1) {
        computerMove = 'rock';
    } else if (randomNumber === 2) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
    return computersMove;
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