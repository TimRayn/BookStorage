async function getBooks() {
    const response = await fetch("/home", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const books = await response.json();
        let description = document.querySelector(".description");
        let cells = document.querySelector(".cell-wrapper");
        cells.innerHTML = "";
        let booksNumber = 0;
        books.forEach(book => {
            cells.append(drawBook(book));
            booksNumber++;
        });
        if (booksNumber === 1){
            description.innerHTML = "You have 1 book";
        }
        else{
            description.innerHTML = "You have " + booksNumber + " books";
        }
    }
}

function toggleCreateBookModal(){
    let toggle = document.querySelector(".modal");
    toggle.classList.toggle("show");
}

async function createBook() {
    let form = document.querySelector(".create-book-form");
    let bookName = form.elements.name.value;
    let bookAuthor = form.elements.author.value;
    let bookPages = +form.elements.pages.value;
    const response = await fetch("/home", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: bookName,
            author: bookAuthor,
            pages: bookPages
        })
    });
    if (response.ok === true) {
        const book = await response.json();
        document.querySelector(".cell-wrapper").append(drawBook(book));
    }
    toggleCreateBookModal();
}

async function deleteBook(id) {
    const response = await fetch("/home/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const book = await response.json();
        document.querySelector("[book-id='" + book.bookId + "']").remove();
    }
}

function drawBook(book) {
    const div = document.createElement("div");
    div.classList.add("book");
    div.setAttribute("book-id", book.bookId)

    const authorParagraph = document.createElement("p");
    authorParagraph.classList.add("author");
    authorParagraph.innerText = book.author;
    div.append(authorParagraph);

    const nameParagraph = document.createElement("p");
    nameParagraph.classList.add("name");
    nameParagraph.innerText = book.name;
    div.append(nameParagraph);

    const pagesParagraph = document.createElement("p");
    pagesParagraph.classList.add("pages");
    pagesParagraph.innerText = book.pages;
    div.append(pagesParagraph);

    const removeButton = document.createElement("button");
    removeButton.classList.add("delete-button");
    removeButton.innerText = "Delete";
    removeButton.addEventListener("click", e => {
        e.preventDefault();
        deleteBook(book.bookId);
    });
    div.append(removeButton);

    return div;
}

let timer = setInterval(getBooks, 10000);

getBooks();
