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
        field[index] = value;
    }

    // I will need to confirm whether there are cells that remain empty. If no cells remain empty then the game is over. For the situation in which no one has yet produced a winning condition and the game is over, then this should trigger a draw. 
    // for this method, I tried to use "some" or "every" methods, but they didn't work. Why?
    const checkForEmptyCells = (field) => {
        return field.includes(undefined); // returns true if there is at least one undefined item in the array
    }

    // return the value of a cell at a particular index
    const cellValue = (index) => {
        return field[index];
    }

    // set the message at the top of the board
    const message = document.querySelector(".message"); // grab the message element on the dom
    const setMessage = (text) => {
        message.textContent = text; // left it flexible regarding the input as I wanted to perhaps choose which text somewhere else. 
    }

    // create a function to reset the gameboard at certain points; for instance, when the reset button is selected or the game mode is changed.
    const resetGame = () => {
        resetField();
        renderField();
        setMessage("Player One's turn");
    } 

    // reset button eventlistener and behaviour
    const resetButton = document.querySelector(".reset"); // grab the dom element
    resetButton.addEventListener("click", resetGame);
 

    // add event listener to a cell in the field on the Dom
    fieldInDom.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            let index = e.target.dataset.index;
            let playersMark = "X"; // this is a placeholder for the purposes of the eventlistener on the cells.
            if (!cellValue(index)) { // if the cell is empty, then we will change the value to match the player.
                changeCellInField(parseInt(index), playersMark); // the players mark here will need to reflect whether it is player one or two. 
            } 
            renderField();
        })
    })

})();