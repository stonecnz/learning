const gameboard = (() => { // using a module pattern to create the gameBoard object
    let gameboardArr = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']; // initialising the array to hold each of the squares on the gameboard
    
    const getGameboardArr = () => console.log(`The current gameboard looks like: ${gameboardArr}`);
    
    const renderGameboard = () => {
        let board = document.querySelector('.game-board');
        gameboardArr.forEach(x => {
            let square = document.createElement('div');
            square.innerText = x;
            square.classList = 'game-square';
            board.appendChild(square);
        });
    }
    
    return {
        getGameboardArr,
        renderGameboard
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

gameboard.getGameboardArr();
gameboard.renderGameboard();
