const submitButton = document.querySelector('.submit');
const invertButton = document.querySelector('.invert');
const menu = document.querySelector('.menu');
let pixelSize = 32;
let defaultColour = 'Purple';

const gridContainer = document.createElement('div'); // create a div to hold the grid
menu.insertAdjacentElement('afterend', gridContainer); // add the grid-container to the html page
gridContainer.classList.add('grid-container'); // give the div a class so that I can add css
let canvasWidth = gridContainer.getBoundingClientRect().width;

const createGrid = () => {
    for (i = 0; i < (pixelSize*pixelSize); i++) { //create row
        const grid = document.createElement('div');
        gridContainer.appendChild(grid);
        grid.classList.add('grid');

        const gridWidth = canvasWidth/pixelSize;
        grid.style.width = `${gridWidth}px`;
        grid.style.height = `${gridWidth}px`;
    }
};

createGrid();

let grids = document.querySelectorAll('.grid');

const addDrawAnimation = () => {
    let grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.addEventListener('mouseover', function() {
            if (defaultColour != 'Rainbow') {
                grid.style.backgroundColor = defaultColour;
            } else {
                grid.style.backgroundColor = genRandColour();
            }
            
        });
    });
};

const genRandColour = () => {
    let randRGB = () => {
        return Math.floor(Math.random()*256);
    }
    return `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`; 
}

addDrawAnimation();

const clearGrid = () => {
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    };
}

submitButton.addEventListener('click', function() {
    clearGrid();
    createGrid();
    addDrawAnimation();
});

const sizes = document.querySelectorAll('.size');
sizes.forEach((size) => {
    if (Number(size.innerHTML) === pixelSize) {
        size.classList.add('active-size');
    }
    size.addEventListener('click', function() {
        sizes.forEach((size) => {
            size.classList.remove('active-size');
        });
        size.classList.add('active-size');
        pixelSize = Number(size.innerHTML);
        clearGrid();
        createGrid();
        addDrawAnimation();
    });
});

const colours = document.querySelectorAll('.colour');
colours.forEach((colour) => {
    if (colour.innerHTML === defaultColour) {
        colour.classList.add('active-size');
    };
    colour.addEventListener('click', function() {
        colours.forEach((colour) => {
            colour.classList.remove('active-size');
        });
        colour.classList.add('active-size');
        defaultColour = colour.innerHTML;
    });
});

