// init 
const submitButton = document.querySelector('.submit');
const invertButton = document.querySelector('.invert');
const menu = document.querySelector('.menu');
let grids = document.querySelectorAll('.grid');
let pixelSize = 32;
let defaultColour = 'Purple';

const gridContainer = document.createElement('div'); // create a div to hold the grid
menu.insertAdjacentElement('afterend', gridContainer); // add the grid-container to the html page
gridContainer.classList.add('grid-container'); // give the div a class so that I can add css
let canvasWidth = gridContainer.getBoundingClientRect().width; // used this to get the width

const createGrid = () => { // creates grid squares that fill the container exactly
    for (i = 0; i < (pixelSize*pixelSize); i++) { 
        const grid = document.createElement('div');
        gridContainer.appendChild(grid);
        grid.classList.add('grid');

        const gridWidth = canvasWidth/pixelSize;
        grid.style.width = `${gridWidth}px`;
        grid.style.height = `${gridWidth}px`;
    }
};

const addDrawAnimation = () => { // adds the colour to grid squares when they are entered
    let grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.addEventListener('mouseover', function() {
            if (defaultColour != 'Rainbow') { // rainbow requires extra logic
                grid.style.backgroundColor = defaultColour;
            } else {
                grid.style.backgroundColor = genRandColour();
            }
            
        });
    });
};

const genRandColour = () => { // generates a random rgb for the rainbow colour option
    let randRGB = () => {
        return Math.floor(Math.random()*256);
    }
    return `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`; 
}

const clearGrid = () => { // this merely removes all grid squares
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    };
}

submitButton.addEventListener('click', function() { // clear canvas button clicked, then
    clearGrid();
    createGrid();
    addDrawAnimation();
});

const sizes = document.querySelectorAll('.size'); // grab all of the size options
sizes.forEach((size) => { // for each size option
    if (Number(size.innerHTML) === pixelSize) { // if it is the default then
        size.classList.add('active-size'); // ensure it looks active
    }
    size.addEventListener('click', function() { // when a size option is selected
        sizes.forEach((size) => { // for all sizes
            size.classList.remove('active-size'); //remove the active look
        });
        size.classList.add('active-size'); // make the clicked option look active
        pixelSize = Number(size.innerHTML); // set pixelSize to the clicked option
        clearGrid(); // erase the grid
        createGrid(); // create a new one
        addDrawAnimation(); // add the draw animation
    });
});

const colours = document.querySelectorAll('.colour'); // grab colour options
colours.forEach((colour) => { //for each option
    if (colour.innerHTML === defaultColour) { // if the default is already selected
        colour.classList.add('active-size'); // then ensure that it is active looking
    };
    colour.addEventListener('click', function() { // add an event listener such that
        colours.forEach((colour) => { // for each colour option clicked
            colour.classList.remove('active-size'); // we remove all 'active' buttons
        });
        colour.classList.add('active-size'); // then add the active look to the clicked button
        defaultColour = colour.innerHTML; // then set the default colour to the current selection
    });
});

createGrid();
addDrawAnimation();