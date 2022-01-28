const gameSquares = document.querySelectorAll(".game-square");
const message = document.querySelector(".message");

// using a module pattern to create the gameBoard object
const gameboard = (() => {
  // creating an array to hold each of the squares on the gameboard
  let gameboardArr = ["", "", "", "", "", "", "", "", ""];

  const getGameSquare = (index) => {
    if (index < gameboardArr.length) {
      return gameboardArr[index];
    }
  };

  //to check whether there is an empty cell at an index
  const checkIfCellEmpty = (index) => {
    return gameboardArr[index] === "" ? true : false;
  };

  const checkIfAllCellsFull = () => {
    return gameboardArr.every((item) => {
      item !== "";
    });
  };

  // the current move in a round: even = x; odd = o.
  let currentMove = 0;

  const getCurrentMove = () => {
    return currentMove;
  };

  const progressCurrentMove = () => {
    currentMove++;
  };

  const resetCurrentMove = () => {
    currentMove = 0;
  };

  const getMarker = () => {
    if (currentMove % 2 === 0) {
      return "X";
    } else {
      return "O";
    }
  };

  // Sets the message to reflect whose turn it is
  const updateTurnMessage = () => {
    message.textContent = `Player ${getMarker()}'s turn`;
  };

  updateTurnMessage();

  const draw = () => {
    message.textContent = "The game was a draw";
  };

  // status of game
  let gameStatus = true;

  const getGameStatus = () => {
    return gameStatus;
  };

  const endGame = () => {
    gameStatus = false;
  };

  // setting up the ability to toggle on a pvp or a pvc game
  let gameSetting = "pvp";

  const changeGameSetting = (setting) => {
    gameSetting = setting;
  };

  let pvpButton = document.querySelector(".pvp");
  let pvcButton = document.querySelector(".pvc");

  pvcButton.addEventListener("click", () => {
    if (gameSetting === "pvp") {
      pvpButton.classList = "pvp";
      pvcButton.classList = "pvc selected-setting";
      changeGameSetting("pvc");
      resetGameboard();
    }
  });

  pvpButton.addEventListener("click", () => {
    if (gameSetting === "pvc") {
      pvpButton.classList = "pvp selected-setting";
      pvcButton.classList = "pvc";
      changeGameSetting("pvp");
      resetGameboard();
    }
  });

  // add an event listener to the squares so that we can place markers then update the board
  gameSquares.forEach((gameSquare) => {
    gameSquare.addEventListener("click", (e) => {
      if (gameStatus && e.target.textContent === "") {
        displayController.playerMove(parseInt(e.target.dataset.index));
      }
      if (getCurrentMove() > 8) {
        endGame();
        draw();
      }
      if (gameStatus && gameSetting === "pvc") {
        setTimeout(function () {
          displayController.compMove(displayController.findBestMove());
        }, 500);
      }
    });
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
  };

  // function to be used to reset when the reset button is clicked.
  const resetGameboard = () => {
    gameboardArr.fill("");
    updateGameboard();
    resetCurrentMove();
    updateTurnMessage();
    gameStatus = true;
  };

  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", resetGameboard);

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
    updateGameboard,
    checkIfCellEmpty,
    checkIfAllCellsFull,
  };
})();

const displayController = (() => {
  // creating the object to control the flow of the game itself
  // identify the 8 win conditions - I want to put this in a wider scope because I want to use it to help decide the computer's next move
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // check to see whether anyone has satisfied a winning condition yet
  // const checkWinCondition = (index) => {
  //     // for each array in the array, filter checks whether they include the index of the square that was just played. Filter then returns an array that contains only those win conditions that contain the played index. Some then checks whether every square at the indices contained in the arrays match the player's marker. If they do, then it returns true.
  //     return winConditions
  //         .filter((condition) => condition.includes(index))
  //         .some((possibleCondition) => possibleCondition.every(
  //             (index) => gameboard.getGameSquare(index) === gameboard.getMarker()));
  // }

  const checkWin = (marker) => {
    return winConditions.some((possibleCondition) =>
      possibleCondition.every(
        (index) => gameboard.getGameSquare(index) === marker
      )
    );
  };

  const checkForWinner = () => {
    let x_arr = [];
    let o_arr = [];

    const resultArray = gameboard.gameboardArr.filter((item) => item != "");
    if (resultArray.length >= 5) {
      //get indexes of each mark in separate array
      gameboard.gameboardArr.forEach((item, index) => {
        if (item == "X") {
          x_arr.push(index);
        } else if (item == "O") {
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
  };

  // this should be placed within a function most likely, but I don't know why or how yet.
  // create a random index between 0-8, check whether there is a marker in the gameboard at that random index, if not, place a marker, move to the next round. If there is already a marker there, then make another random marker.
  const randomEmptySquare = () => {
    let trigger = false;
    let index;
    while (trigger === false) {
      index = Math.floor(Math.random() * 8);
      if (!gameboard.checkIfCellEmpty(index)) {
        trigger = true;
        return index;
      }
    }
  };

  const minmaxEvaluate = () => {
    // I think this is the evaluation formula that determines whether a branch is a good one to take or not.
    //return winner = checkWin("X") ? -10: checkWin("O") ? 10 : 0;
    let winner = checkForWinner();
    return winner === "X" ? -10 : winner === "O" ? 10 : 0;
  };

  const minmax = (board, depth, isMax) => {
    let score = minmaxEvaluate();
    if (score === 10) return score;
    if (score === -10) return score;
    if (gameboard.checkIfAllCellsFull) return 0;
    if (isMax) {
      let best = -1000;

      for (let i = 0; i < board.length; i++) {
        if (gameboard.checkIfCellEmpty(i)) {
          board[i] = "O";
          best = Math.max(best, minmax(board, depth + 1, !isMax));
          board[i] = "";
        }
      }
      return best;
    } else {
      let best = 1000;

      for (let i = 0; i < board.length; i++) {
        if (gameboard.checkIfCellEmpty(i)) {
          board[i] = "X";
          best = Math.max(best, minmax(board, depth + 1, !isMax));
          board[i] = "";
        }
      }
      return best;
    }
  };

  const findBestMove = () => {
    let bestVal = -1000;
    let moveIndex = -1;

    for (let i = 0; i < gameboard.gameboardArr.length; i++) {
      if (gameboard.checkIfCellEmpty(i)) {
        gameboard.gameboardArr[i] = "O";
        let moveVal = minmax(gameboard.gameboardArr, 0, false);
        gameboard.gameboardArr[i] = "";

        if (moveVal > bestVal) {
          moveIndex = i;
          bestVal = moveVal;
        }
      }
    }
    return moveIndex;
  };

  //console.log(findBestMove())

  const displayWinner = () => {
    message.textContent = `Player ${gameboard.getMarker()} won!`;
  };

  // This could be placed within a player factory function and produced when a game is started...
  const playerMove = (index) => {
    gameboard.placeMarker(index);
    if (checkWin("X")) {
      gameboard.endGame();
      displayWinner();
    } else {
      gameboard.progressCurrentMove();
      gameboard.updateTurnMessage();
    }
  };

  const compMove = (index) => {
    gameboard.placeMarker(index);
    if (checkWin("O")) {
      gameboard.endGame();
      displayWinner();
    } else {
      gameboard.progressCurrentMove();
      gameboard.updateTurnMessage();
    }
  };

  return {
    compMove,
    playerMove,
    randomEmptySquare,
    findBestMove,
  };
})();
