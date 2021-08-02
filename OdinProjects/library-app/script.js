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

addBookButton.addEventListener('click', function() {
    if (formPopup.style.display == "none") {
        formPopup.style.display = "block";
    } else {
        formPopup.style.display = "none";
    }
    
})

function clearInput() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    hasReadInput.value= false;
}

newBookSubmitButton.addEventListener('click', function() {
    let x = new Book(titleInput.value, authorInput.value, pagesInput.value, hasReadInput.checked);
    addBookToLibrary(x);
    render();
})

function render() {
    bookContainer.innerHTML = `            <tr class="bookEntry top">
    <th class="bookProp">Title</th>
    <th class="bookProp">Author</th>
    <th class="bookProp">Pages</th>
    <th class="bookProp">Read?</>
</tr>`;
    myLibrary.forEach((book) => {
        let htmlBook = `
        <tr class="bookEntry">
            <td class="bookProp">${book.title}</td>
            <td class="bookProp">${book.author}</td>
            <td class="bookProp">${book.pages}</td>
            <td class="bookProp">${book.hasRead}</td>
        </tr>
        `;
        bookContainer.insertAdjacentHTML('beforeend', htmlBook);
    })
}

render();