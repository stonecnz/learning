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

    // add an event listener to the squares so that we can place markers then update the board
    gameSquares.forEach((gameSquare) => {
        gameSquare.addEventListener('click', (e) => {
            if (gameStatus && e.target.textContent === '') {    
                placeMarker(e.target.dataset.index);
                updateGameboard();
                if (displayController.checkWinCondition(parseInt(e.target.dataset.index), e.target.textContent)) {
                    gameStatus = false;
                    displayController.displayWinner();
                } else {
                    currentMove ++;
                    updateTurnMessage();
                };
            }    
        })
    });

    // depending on who is currently playing, adds the player's marker into the gameboardArray
    const placeMarker = (index) => {
        if (index < gameboardArr.length) {
            gameboardArr[index] = getMarker();
        }
    };

    //Update the gameboard by iterating through the node list and matching the array to each in the list
    const updateGameboard = () => {
        for (let i = 0; i < gameSquares.length; i++) {
            gameSquares[i].textContent = gameboardArr[i];            
        }
    }
    updateGameboard();

    // function to be used to reset when the reset button is clicked.
    const resetGameboard = () => {
        gameboardArr.fill('');
        updateGameboard();
        currentMove = 0;
        updateTurnMessage();
    }

    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', resetGameboard);
    
    return {
        gameboardArr,
        getGameSquare,
        getMarker
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

    return {
        checkWinCondition,
        displayWinner
    };

})();

const Player = (name) => { // creating a factor for the objects that play the game

}

const AI = () => { // creating a factor for the AI player that inherets methods and properties from the player object

}