// the gameboard has 9 values that relate to the 9 spaces on the board. These values can either be 'x' or 'o'.
// The gameboard contains a function to render the 9 game squares on the screen. Each of these gamesquare should come with an event listener.
// 

const gameboard = (() => { // using a module pattern to create the gameBoard object
    let gameboardArr = ['', '', '', '', '', '', '', '', '']; // initialising the array to hold each of the squares on the gameboard
    
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
                    gameboardArr[this.dataset.index] = 'x';
                    renderGameboard();
                } else {
                    console.log('No!');
                };
            })
            board.appendChild(square);
            index ++;
        });
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
    const getName = () => name;

}

const AI = () => { // creating a factor for the AI player that inherets methods and properties from the player object

}


gameboard.renderGameboard();

