let myLibrary = [];
const bookContainer = document.querySelector('.bookContainer');

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