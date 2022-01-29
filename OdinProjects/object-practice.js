function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    if (typeof pages != Number) {
        this.pages = 0;
    } else {
        this.pages = pages;
    }
    this.hasRead = hasRead
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}.`
    }
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', "peter", "not read yet");
console.log(book1.info());

console.log(book1.constructor);

const myArr = new Array();
console.log(myArr.constructor);