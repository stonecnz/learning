let playersMove = '';
let runningPlayerTotal = 0;
let runningCompTotal = 0;
let roundNum = 0;

const btns = document.querySelectorAll('.btn'); // select the buttons
const currentRound = document.querySelector('.current-round'); // selects the current round element
const restart = document.querySelector('.restart');
const gameRound = document.querySelector('.game-container');
const gameRoundOutcome = document.querySelector('.game');

btns.forEach((btn) => { // add functionality to each button
    btn.addEventListener('mousedown', function() {
        btn.classList.add('playing'); // makes an animation when you select the button

        playersMove = btn.id; // inputs the player's move
        let computersMove = genCompMove();
        
        let outcome = playARound(playersMove, computersMove);
        if (outcome == 0) {
            runningCompTotal += 1;
            runningPlayerTotal += 1;
        } else if (outcome == 1) {
            runningPlayerTotal += 1;
        } else {
            runningCompTotal += 1;
        }

        gameRound.style.display = 'block';
        gameRoundOutcome.innerHTML = `Computer's last move: ${computersMove}`;
    });
    btn.addEventListener('mouseup', function() {
        btn.classList.remove('playing');

        roundNum += 1; // increments the round each time the player clicks a button
        currentRound.innerHTML = roundNum; // displays the new round
        endGame(roundNum);
    });
});

const endGame = (roundNum) => {
    if (roundNum >= 5) {
        document.querySelector('.btn-container').style.display = "none";
        document.querySelector('.select-move').style.display = 'none';
        restart.style.display = 'block';
        document.querySelector('.outcome').innerHTML = getOutcome();
        gameRoundOutcome.style.display = 'none';
    }
};

restart.addEventListener('mousedown', function() {
    restart.classList.add("playing");
});

restart.addEventListener('mouseup', function() {
    roundNum = 0;
    runningCompTotal = 0;
    runningPlayerTotal = 0;
    currentRound.innerHTML = roundNum;
    restart.classList.remove('playing');
    restart.style.display = "none";
    document.querySelector('.btn-container').style.display = "flex";
    gameRound.style.display = 'none';
    document.querySelector('.outcome').innerHTML = '';
    document.querySelector('.select-move').style.display = 'block';
    gameRoundOutcome.style.display = 'block';
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
    return computerMove;
}

// init the function to play a single round; take players input and computers input as params
function playARound(playersMove, computersMove) {
    let outcome = 0;     // init an outcome variable - 0 = draw; 1 = win; 2 = lose

    if (playersMove === computersMove) {     // compare all possible combinations and update the outcome with the outcome
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
    return outcome;     // return the outcome needed
}

// run the whole thing for 5 rounds and declare an overall winner
function getOutcome() {   
    if (runningPlayerTotal === runningCompTotal) {
        return("All games ended in a draw...");
    } else if (runningPlayerTotal > runningCompTotal) {
        return("All games ended with you winning!");
    } else {
        return("All games ended with the computer winning... sad-face!");
    }
}