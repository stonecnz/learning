const gameSquares = document.querySelectorAll('.game-square');
const message = document.querySelector('.message');

// using a module pattern to create the gameBoard object
const gameboard = (() => { 
    // creating an array to hold each of the squares on the gameboard
    let gameboardArr = ['','','','','','','','','']; 

    const getGameSquare = (index) => {
        if (index < gameboardArr.length) {
            return gameboardArr[index];
        }
    }

    // the current move in a round: even = x; odd = o.
    let currentMove = 0;

    const getCurrentMove = () => {
        return currentMove;
    } 

    const progressCurrentMove = () => {
        currentMove ++;
    }

    const resetCurrentMove = () => {
        currentMove = 0;
    }

    const getMarker = () => {
        if (currentMove % 2 === 0) {
            return 'X';
        } else {
            return 'O';
        }
    };

    const updateTurnMessage = () => {
        message.textContent = `Player ${getMarker()}'s turn`;
    }

    updateTurnMessage();


    // status of game
    let gameStatus = true;

    const getGameStatus = () => {
        return gameStatus;
    }

    const endGame = () => {
        gameStatus = false;
    }

    // add an event listener to the squares so that we can place markers then update the board
    gameSquares.forEach((gameSquare) => {
        gameSquare.addEventListener('click', (e) => {
            if (gameStatus && e.target.textContent === '') {
                displayController.playerMove(parseInt(e.target.dataset.index));    
            }
            if (getCurrentMove() === 8) {
                endGame();
            }
            if (gameStatus) {
                setTimeout(function() {
                    displayController.compMove();
                }, 500);
            }
        })
    });

    // depending on who is currently playing, adds the player's marker into the gameboardArray
    const placeMarker = (index) => {
        if (index < gameboardArr.length) {
            gameboardArr[index] = getMarker();
        }
        updateGameboard();
    };

    //Update the gameboard by iterating through the node list and matching the array to each in the list
    const updateGameboard = () => {
        for (let i = 0; i < gameSquares.length; i++) {
            gameSquares[i].textContent = gameboardArr[i];            
        }
    }

    // function to be used to reset when the reset button is clicked.
    const resetGameboard = () => {
        gameboardArr.fill('');
        updateGameboard();
        resetCurrentMove();
        updateTurnMessage();
        gameStatus = true
    }

    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', resetGameboard);
    
    return {
        gameboardArr,
        getGameSquare,
        getMarker,
        getGameStatus,
        endGame,
        getCurrentMove,
        progressCurrentMove,
        resetCurrentMove,
        updateTurnMessage,
        placeMarker,
        updateGameboard
    };
})();

const displayController = (() => { // creating the object to control the flow of the game itself

    // check to see whether anyone has satisfied a winning condition yet
    const checkWinCondition = (squareIndex, marker) => {
        // identify the 8 win conditions
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]]; 

        // for each array in the array, filter checks whether they include the index of the square that was just played. Filter then returns an array that contains only those win conditions that contain the played index. Some then checks whether every square at the indices contained in the arrays match the player's marker. If they do, then it returns true.
        return winConditions
            .filter((condition) => condition.includes(squareIndex))
            .some((possibleCondition) => possibleCondition.every(
                (index) => gameboard.getGameSquare(index) === marker));
    }

    const displayWinner = () => {
        message.textContent = `Player ${gameboard.getMarker()} won!`
    }

    // This could be placed within a player factory function and produced when a game is started...  
    const playerMove = (squareIndex) => {
        gameboard.placeMarker(squareIndex);
        if (checkWinCondition(squareIndex, gameboard.getMarker())) {
            gameboard.endGame();
            displayWinner();
        } else {
            gameboard.progressCurrentMove();
            gameboard.updateTurnMessage();
        }             
    }

    // this should be placed within a function most likely, but I don't know why or how yet. 
    // create a random index between 0-8, check whether there is a marker in the gameboard at that random index, if not, place a marker, move to the next round. If there is already a marker there, then make another random marker.
    const compMove = () => {
        let trigger = false;
        let randomIndex;
        while (trigger === false) {
            randomIndex = Math.floor(Math.random() * 8);
            if (gameboard.getGameSquare(randomIndex) === '') {
                gameboard.placeMarker(randomIndex);
                trigger = true;
            }
        }
        if (checkWinCondition(randomIndex, gameboard.getMarker())) {
            gameboard.endGame();
            displayWinner();
        } else {
            gameboard.progressCurrentMove();
            gameboard.updateTurnMessage();
        }
    };

    return {
        checkWinCondition,
        displayWinner,
        compMove,
        playerMove
    };

})();

const Player = (name) => { // creating a factor for the objects that play the game

}

const AI = () => { // creating a factor for the AI player that inherets methods and properties from the player object

}