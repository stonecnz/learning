const body = document.querySelector('body'); // init the page element

const gridContainer = document.createElement('div'); // create a div to hold the grid
gridContainer.classList.add('grid-container'); // give the div a class so that I can add css

body.appendChild(gridContainer); // add the grid-container to the html page

const createGrid = (size) => {
    for (i = 0; i < size; i++) { //create row
        let grid = document.createElement('div');
        grid.classList.add(`row${i}`);
        grid.classList.add('grid');
        gridContainer.appendChild(grid);

        for (j = 0; j < size; j++) {
            let grid = document.createElement('div');
            grid.classList.add('column');
            grid.classList.add('grid');

            let gridRow = document.querySelector(`.row${i}`);
            gridRow.appendChild(grid);
        }
    }
}

createGrid(16);