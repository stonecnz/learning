let myLibrary = [];

const bookContainer = document.querySelector('.bookContainer');
const addBookButton = document.querySelector('.add-book-button'); 
const formPopup = document.querySelector('.form-popup');
const newBookSubmitButton = document.querySelector('.submit-btn');
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');
const hasReadInput = document.querySelector('.hasRead-input');

function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    if (typeof pages != Number) {
        this.pages = 0;
    } else {
        this.pages = pages;
    }
    this.hasRead = hasRead
    // this.info = function() {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}.`
    // }
}

function checkBook(book) {
    return newBook.title == book.title; 
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
};

let cat = new Book('Hallow', "me", 54, "False");
addBookToLibrary(cat);
let potato = new Book('Hallow', "Webb, Catherine", 54, "False");
addBookToLibrary(potato);

myLibrary.forEach(book => {
    let bookEntry = document.createElement('div');
    bookContainer.appendChild(bookEntry);
    bookEntry.classList.add('bookEntry');
    Object.keys(book).forEach(key => {
        let bookProp = document.createElement('p');
        bookProp.innerHTML = book[key];
        bookEntry.appendChild(bookProp);
        bookProp.classList.add('bookProp');
    }) 

})

addBookButton.addEventListener('click', function() {
    if (formPopup.style.display == "none") {
        formPopup.style.display = "block";
    } else {
        formPopup.style.display = "none";
    }
    
})

newBookSubmitButton.addEventListener('click', function() {
    console.log(titleInput.value, authorInput.value, pagesInput.value, hasReadInput.value);
    let x = new Book(titleInput.value, authorInput.value, pagesInput.value, hasReadInput.value);
    addBookToLibrary(x);
    console.log(myLibrary);
    let bookEntry = document.createElement('div');
    bookContainer.appendChild(bookEntry);
    bookEntry.classList.add('bookEntry');
    let lastBook = myLibrary.length;
    Object.keys(myLibrary[lastBook - 1]).forEach(key => {
        let bookProp = document.createElement('p');
        bookProp.innerHTML = myLibrary[lastBook - 1][key];
        bookEntry.appendChild(bookProp);
        bookProp.classList.add('bookProp');
    }) 
})