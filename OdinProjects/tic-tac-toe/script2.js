const gameLogic =(() => {
    // a current round is required to determine who the current player is: if modulo 2 then player with the X plays; otherwise, player with the O plays. 
    let currentRound = 0;

    // this will be used when determining the current player
    const getCurrentRound = () => {
        return currentRound
    }

    // this will be used to progress into the next round
    const nextRound = () => {
        if (currentRound === 8) return;
        currentRound++;
    }

    // when the reset button is pressed or the mode is changed, this will be used to reset the round to 0 and restart the game
    const resetCurrentRound = () => {
        currentRound = 0;
    }

    // the current marker is always based on the current round. All even rounds will be X, because X always starts. Determining who is X occurs elsewhere. 
    const getCurrentMarker = () => {
        return currentMarker = currentRound % 2 === 0 ? "X" : "O";
    }

    // setting the difficulty for the AI
    let gameDifficulty = "Easy";

    // grab the dom elements
    const difficultyDisplay = document.querySelectorAll(".difficulty");

    // toggle game difficulty
    const toggleGameDifficulty = (eventTarget) => {
        if (gameDifficulty === "Easy" && eventTarget.target.textContent === "Hard") {
            gameDifficulty = "Hard";
            eventTarget.target.classList.add("selected-difficulty");
            eventTarget.target.previousElementSibling.classList.remove("selected-difficulty");
        }
        if (gameDifficulty === "Hard" && eventTarget.target.textContent === "Easy") {
            gameDifficulty = "Easy";
            eventTarget.target.classList.add("selected-difficulty");
            eventTarget.target.nextElementSibling.classList.remove("selected-difficulty");
        }
    }

    // return gameDifficulty
    const getGameDifficulty = () => {
        return gameDifficulty;
    }

    // add eventlisteners to the difficulties so that they toggle
    difficultyDisplay.forEach((element) => {
        element.addEventListener("click", toggleGameDifficulty)
    })

    // declaring the gamemode so that these can be changed. 
    let gamemode = "pvp";

    // return the currentGameMode to be used for selecting whether the AI responds
    const getGamemode = () => {
        return gamemode;
    }

    // change gamemode
    const toggleGamemode = (eventTarget) => {
        if (eventTarget.target.textContent === "Player vs. Player" && gamemode === "pvc") {
            gamemode = "pvp"; // sets the gamemode to match the DOM selection
            eventTarget.target.classList = "gamemode selected"; // adds the "seleected" class to the gamemode currently selected
            eventTarget.target.nextElementSibling.classList = "gamemode"; // removes the "selected" class from the gamemode no longer selected
            difficultyDisplay.forEach((element) => {
                element.style.display = "none";
            })
        }
        if (eventTarget.target.textContent === "Player vs. Computer" && gamemode === "pvp") {
            gamemode = "pvc";
            eventTarget.target.classList = "gamemode selected";
            eventTarget.target.previousElementSibling.classList = "gamemode";
            difficultyDisplay.forEach((element) => {
                element.style.display = "block";
                if (element.textContent === gameDifficulty) element.classList.add("selected-difficulty");
            })  
        } 
    }



    let gameStatus = true;

    const getGameStatus = () => {
        return gameStatus;
    }

    const endGame = () => {
        gameStatus = false;
    }

    const resetGameStatus = () => {
        gameStatus = true;
    }

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]; 
    
    const checkForWinner = (field) => {
        let x_arr = [];
        let o_arr = [];

        const resultArray = field.filter((item) => item != "");
        if (resultArray.length >= 5) {
            //get indexes of each mark in separate array
            field.forEach((item, index) => {
                if (item === 'X') {
                    x_arr.push(index);
                } else if (item === 'O') {
                    o_arr.push(index);
                }
            });
            
            for (let i = 0; i < winConditions.length; i++) {
                const possibleCondition = winConditions[i];
                let x_result = possibleCondition.every((item) => x_arr.includes(item));
                let o_result = possibleCondition.every((item) => o_arr.includes(item));

                if (x_result || o_result) {
                    return x_result ? "X" : "O";
                }
            }
        }
    }

    // I have yet to fully understand what it is doing here. 
    const minmaxEvaluate = (field) => {
        let winner = checkForWinner(field);
        return winner === "X" ? -1000 : winner === "O" ? 1000 : 0;
    }

    const minmax = (board, depth, isMax) => {
        if (depth === 0) return 0;
        let score = minmaxEvaluate(board);
        if (score === 1000) return score;
        if (score === -1000) return score;


        if (isMax) {
            let maxEval = -1000;

            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = "O";
                    maxEval = Math.max(maxEval, minmax(board, depth - 1, false));
                    board[i] = undefined;
                }
            }
            return maxEval;
        } else {
            let minEval = 1000;

            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = "X";
                    minEval = Math.min(minEval, minmax(board, depth - 1, true));
                    board[i] = undefined;
                }
            }
            return minEval;
        }
    }

    const findBestMove = (field) => {
        let bestVal = -1000;
        let moveIndex = -1;

        for (let i = 0; i < field.length; i++) {
            if (!field[i]) {
                field[i] = "O";
                let moveVal = minmax(field, (8 - getCurrentRound()), false);
                field[i] = undefined;

                if (moveVal > bestVal) {
                    moveIndex = i;
                    bestVal = moveVal;
                }
            }
        }
        return moveIndex;
    }

    return {
        getCurrentRound,
        nextRound,
        resetCurrentRound,
        getCurrentMarker,
        getGameStatus,
        toggleGamemode,
        getGamemode,
        checkForWinner,
        endGame,
        resetGameStatus,
        findBestMove,
        getGameDifficulty
    }
})();

//using a module pattern to set up the basic gameboard and the gameboards behaviour
const gameboard = (() => {
    // setting up the array to hold the current gameboard. This particular way of doing it produces an array of 9 undefined items. I should be able to iterate across these using a for... of method. An 'undefined' value should be equal to false as well, making the task of finding empty cells in the field easier.    
    let field = new Array(9);

    // populate the actual gameboard's dom elements with the values from the field array
    const fieldInDom = document.querySelectorAll('.game-square'); // grab the dom elements which relate to the field
    const renderField = () => {
        for (i = 0; i < field.length; i++) {
            fieldInDom[i].textContent = field[i];
        }
    }
    
    // clearing all cells in the field
    const resetField = () => {
        field = new Array(9);
    }

    // add a value to a cell in the field
    const changeCellInField = (index, value) => {
        if (index > field.length) return;
        if (index === undefined) return;
        field[index] = value;
    }

    // I will need to confirm whether there are cells that remain empty. If no cells remain empty then the game is over. For the situation in which no one has yet produced a winning condition and the game is over, then this should trigger a draw. 
    // for this method, I tried to use "some" or "every" methods, but they didn't work. Why?
    const checkForEmptyCells = () => {
        return field.includes(undefined); // returns true if there is at least one undefined item in the array
    }

    // return the value of a cell at a particular index
    const cellValue = (index) => {
        return field[index];
    }

    // return a list of indexes from the current field - I wanted to use this to produce a random index from the list of empty fields
    const getIndexesOfEmptyCells = () => {
        let indexArray = []; // there must be an easier way than creating a temporary variable and pushing to it
        for (index = 0; index < field.length; index++) {
            if (!field[index]) indexArray.push(index);
        }
        return indexArray;
    }

    // this can be combined with the function above to pull a random index from an array of empty indexes. 
    const getRandomIndex = array => {
        // return a random item from an array
        return array[Math.floor(Math.random() * array.length)];
    }

    // set the message at the top of the board
    const message = document.querySelector(".message"); // grab the message element on the dom
    const getMessage = () => {
        if (!checkForEmptyCells() && gameLogic.getGameStatus()) return "The game was a draw"; // return a draw message if there are no remaining cells but the game status is still true, i.e., no one has won yet. 
        if (checkForEmptyCells() && gameLogic.getGameStatus()) return `${gameLogic.getCurrentMarker()}'s Turn`; // return the current players message if there are empty cells and no one has won yet.
        if (!gameLogic.getGameStatus()) return `${gameLogic.getCurrentMarker()} Won` // return the winner's message if someone has won. I haven't written the function for this yet.
    }

    const setMessage = (text) => {
        message.textContent = text; // left it flexible regarding the input as I wanted to perhaps choose which text somewhere else. 
    }

    // create a function to reset the gameboard at certain points; for instance, when the reset button is selected or the game mode is changed.
    const resetGame = () => {
        resetField();
        renderField();
        gameLogic.resetGameStatus();
        gameLogic.resetCurrentRound();
        setMessage(getMessage());
    } 

    // reset button eventlistener and behaviour
    const resetButton = document.querySelector(".reset"); // grab the dom element
    resetButton.addEventListener("click", resetGame);
    resetButton.addEventListener("mousedown", (e) => {
        e.target.classList.add("active");
    })
    resetButton.addEventListener("mouseup", (e) => {
        e.target.classList.remove("active");
    })

    const placeMarker = (index, marker) => {  
        if (!gameLogic.getGameStatus()) return; // return out of the function if the game is no longer active; i.e., it has been won or drawn.
        if (!cellValue(index)) changeCellInField(parseInt(index), marker); // add marker to cell
        if (gameLogic.checkForWinner(field)) gameLogic.endGame(); // ends the game, turns the game status to false, if someone has won. 
        if (checkForEmptyCells() && gameLogic.getGameStatus()) gameLogic.nextRound();
        setMessage(getMessage());
    }

    // computers move
    const computersMove = () => {
        if (gameLogic.getGameDifficulty() === "Hard") {
            placeMarker(gameLogic.findBestMove(field), gameLogic.getCurrentMarker());
            renderField(); // renders the field with all of the new markers present.
        } else {
            placeMarker(getRandomIndex(getIndexesOfEmptyCells()), gameLogic.getCurrentMarker());
            renderField(); // renders the field with all of the new markers present.
        }
        fieldInDom.forEach((cell) => {
            cell.addEventListener("click", actOnClick);
        })
    }

    // the event listener function to be passed to cells
    const actOnClick = (eventTarget) => {
        placeMarker(eventTarget.target.dataset.index, gameLogic.getCurrentMarker()); // places a marker in the field at a certain index.
        renderField(); // renders the field with all of the new markers present.
        if (gameLogic.getGamemode() === "pvc") { 
            // if the game mode is set to player vs computer, then remove the event listener to avoid double clicking before the computer has placed a marker
            fieldInDom.forEach((cell) => {
                cell.removeEventListener("click", actOnClick);
            })
            setTimeout(computersMove, 1000);
        }
    }

    // add event listener to a cell in the field on the Dom
    fieldInDom.forEach((cell) => {
        cell.addEventListener("click", actOnClick);
    });

    // grabbing the dom elements for the gamemode and assigning an event listener to change the gamemode
    const gamemodeButtons = document.querySelectorAll(".gamemode");
    gamemodeButtons.forEach((button) => { // iterates through the nodelist to assign the listener
        button.addEventListener("click", (e) => { // when selecting a different gamemode, reset the game. 
            if (e.target.textContent === "Player vs. Player" && gameLogic.getGamemode() === "pvc") resetGame();
            if (e.target.textContent === "Player vs. Computer" && gameLogic.getGamemode() === "pvp") resetGame();
        })
        button.addEventListener("click", gameLogic.toggleGamemode); // switches the gamemodes
    })

    return {
        cellValue,
        changeCellInField
    }

})();