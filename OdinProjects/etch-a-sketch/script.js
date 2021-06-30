const body = document.querySelector('body'); // init the page element
const submitButton = document.querySelector('.submit');

const changeDimensions = () => {
    let sizeOfGrid = document.querySelector("#size").value;
    let widthOfCanvas = document.querySelector("#width").value;
    console.log(sizeOfGrid);
    if (sizeOfGrid === '' || widthOfCanvas === '') {
        sizeOfGrid = 90;
        widthOfCanvas = 900;
    }
    createGrid(sizeOfGrid, widthOfCanvas);
}

const createGrid = (size, width) => {
    let gridContainer = document.createElement('div'); // create a div to hold the grid
    gridContainer.classList.add('grid-container'); // give the div a class so that I can add css
    body.appendChild(gridContainer); // add the grid-container to the html page
    gridContainer.style.width = `${width}px`;
    gridContainer.style.height = `${width}px`;

    for (i = 0; i < (size*size); i++) { //create row
        let grid = document.createElement('div');
        grid.classList.add('grid');

        let gridWidth = width/size;
        grid.style.width = `${gridWidth}px`;
        grid.style.height = `${gridWidth}px`;

        gridContainer.appendChild(grid);
    }
}


submitButton.addEventListener('click', changeDimensions, {
    once: true
});