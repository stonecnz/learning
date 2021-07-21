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
    this.pages = pages;
    this.hasRead = hasRead
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
};

let cat = new Book('Hallow', "me", 54, false);
addBookToLibrary(cat);
let potato = new Book('Hallow', "Webb, Catherine", 53, false);
addBookToLibrary(potato);

const addBooksToPage = (book) => {
    let bookEntry = document.createElement('div');
    bookContainer.appendChild(bookEntry);
    bookEntry.classList.add('bookEntry');
    Object.keys(book).forEach(key => {
        let bookProp = document.createElement('p');
        bookProp.innerHTML = book[key];
        bookEntry.appendChild(bookProp);
        bookProp.classList.add('bookProp');
    })
};

myLibrary.forEach(book => addBooksToPage(book));

addBookButton.addEventListener('click', function() {
    if (formPopup.style.display == "none") {
        formPopup.style.display = "block";
    } else {
        formPopup.style.display = "none";
    }
    
})

newBookSubmitButton.addEventListener('click', function() {
    let x = new Book(titleInput.value, authorInput.value, pagesInput.value, hasReadInput.checked);
    addBookToLibrary(x);
    addBooksToPage(x);
})

let myTitle = document.querySelector("#myTitle");
