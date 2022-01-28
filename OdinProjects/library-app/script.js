let myLibrary = [
  {
    title: "What the dog doing?",
    author: "Caleb Stone",
    pages: 1000000,
    read: false,
  },
  {
    title: "The Cat in the Hat",
    author: "Katie Stamm",
    pages: 3,
    read: true,
  },
];

class Book {
  constructor(title, author, pages = 0, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`;
  }
}

// function to add objects to array
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

const createBook = (item) => {
  let cell = document.createElement("td");
  let text = document.createTextNode(item);
  cell.appendChild(text);
  cell.classList = "table-row";

  if (item == "Delete" || item == false || item == true) {
    cell.classList = "table-row delete-btn";
  }
  return cell;
};

const deleteBook = (index) => {
  myLibrary.splice(index, 1);
};

const changeStatus = (index) => {
  if (myLibrary[index].read == false) {
    myLibrary[index].read = true;
  } else {
    myLibrary[index].read = false;
  }
};

const libraryTable = document.querySelector(".library-table");

libraryTable.addEventListener("click", (e) => {
  if (e.target.innerText == "Delete") {
    let index = e.target.parentNode.dataset.index;
    deleteBook(index);
    displayMyLibrary();
  }

  if (e.target.innerHTML == "true" || e.target.innerHTML == "false") {
    let index = e.target.parentNode.dataset.index;
    changeStatus(index);
    displayMyLibrary();
  }
});

function displayMyLibrary() {
  let index = 0;

  let headerRow = document.querySelector(".header-row");
  libraryTable.innerHTML = "";
  libraryTable.appendChild(headerRow);

  myLibrary.forEach((book) => {
    //Add each book
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("data-index", index);

    //Add each value to the row
    tableRow.appendChild(createBook(book.title));
    tableRow.appendChild(createBook(book.author));
    tableRow.appendChild(createBook(book.pages));
    tableRow.appendChild(createBook(book.read));
    tableRow.appendChild(createBook("Delete"));

    // add the rows to the table
    libraryTable.appendChild(tableRow);
    index++;
  });
}

const newBookBtn = document.querySelector("#new-book-submit");

newBookBtn.addEventListener("click", () => {
  let newTitle = document.getElementById("book-title");
  let newAuthor = document.getElementById("book-author");
  let newPages = document.getElementById("book-pages");
  let newRead = document.getElementById("book-read");

  if (newTitle.value && newAuthor.value && newPages.value) {
    let newBook = new Book(
      newTitle.value,
      newAuthor.value,
      newPages.value,
      newRead.checked
    );
    addBookToLibrary(newBook);

    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
    newRead.checked = false;
  } else {
    alert("Bitch, add the rest of the necessary values!");
  }

  displayMyLibrary();
});

displayMyLibrary();
