// the gameboard has 9 values that relate to the 9 spaces on the board. These values can either be 'x' or 'o'.
// The gameboard contains a function to render the 9 game squares on the screen. 

// input: an array of 9; output: a 3x3 grid with each square containing data from an element in the array 
// create an array that has nine data points, but contains no data
// create a 3x3 grid with the data from the array

// input: player clicks on a square in the grid; output: a marker is placed within that square
// listen for a click on a square
// identify whether it was the player or the AI's turn
// store the appropriate marker and index
// change the data in the array at the appropriate index
// render the change to the 3x3 grid (if AI, render this after a slight delay)
// check whether a win condition has been satisfied - its own problem

// win-condition
// input: an array of 9 data points; output: a boolean determining whether a win condition has been satisfied and the winners name
// look through elements
// check if one of the 8 win-conditions has been satisfied
// determine which player satisfied the win-condition
// return a boolean which identifies current win-condition and if true then who satisfied it



const gameboard = (() => { // using a module pattern to create the gameBoard object
    let gameboardArr = Array.from({length: 9},(i) => ''); // initialising the array to hold each of the squares on the gameboard
    
    const renderGameboard = () => {
        let board = document.querySelector('.game-board');
        while(board.lastChild) {
            board.removeChild(board.lastChild);
        }
        let index = 0;
        gameboardArr.forEach(x => {
            let square = document.createElement('div');
            square.innerText = x;
            square.classList = 'game-square';
            square.setAttribute('data-index', index);
            
            square.addEventListener('click', function() {
                if (!this.innerText) {
                    gameboardArr[this.dataset.index] = 'o';
                    renderGameboard();
                    checkWinCondition();
                } else {
                    console.log('No!');
                };
            })
            board.appendChild(square);
            index ++;
        });
    }

    const checkWinCondition = () => {
        let winCondition = false;
        let winner = null;
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

        // look through elements and check if one of the 8 win-conditions has been satisfied
        winConditions.forEach(condition => {
            let xCount = 0;
            let oCount = 0;
                condition.forEach(index => {
                    if (gameboardArr[index] == 'x') {
                        xCount ++;    
                    } else if (gameboardArr[index] == 'o') {
                        oCount ++;
                    }
                })
            if (xCount == 3) {
                winCondition = true;
                winner = 'x';
            } else if (oCount == 3) {
                winCondition = true;
                winner = 'o';
            }
        }) 

        // return a boolean which identifies current win-condition and if true then who satisfied it
        console.log(winCondition, winner);
        return {
            winCondition, 
            winner
        }
    }
    

    const setMarker = (index, marker) => {
        gameboardArr[index-1] = marker;
        renderGameboard();
    }
    
    return {
        renderGameboard,
        setMarker
    };
})();

const displayController = (() => { // creating the object to control the flow of the game itself

})();

const Player = (name) => { // creating a factor for the objects that play the game
    let numWins = 0;
    let marker = 'x'
    const getName = () => name;

}

const AI = () => { // creating a factor for the AI player that inherets methods and properties from the player object

}


gameboard.renderGameboard();

