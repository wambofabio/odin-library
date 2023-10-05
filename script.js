const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
  };
}

function addBookToLibrary() {
  let title = prompt("Enter the title of the book");
  let author = prompt("Enter the author of the book");
  let pages = prompt("Enter the number of pages in the book");
  let status = prompt("Enter the status of the book");

  let newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);

  console.log("book added to library:", newBook.info());
}

function removeBook(index) {
  myLibrary.splice(index, 1); // Remove the book from the myLibrary array
  displayBooks(); // Redraw the table
}

function displayBooks() {
  const libraryContainer = document.getElementById("libraryContainer");

  // Clear existing table if any
  const oldTable = document.querySelector("table");
  if (oldTable) libraryContainer.removeChild(oldTable);

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headers = ["Title", "Author", "Pages", "Status", "Actions"]; // Added "Actions" for the remove button

  // Add table headers
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Add Book details
  myLibrary.forEach((book, index) => {
    const bookRow = document.createElement("tr");
    const bookDetails = [book.title, book.author, book.pages, book.status];
    bookDetails.forEach((detail) => {
      const td = document.createElement("td");
      td.textContent = detail;
      bookRow.appendChild(td);
    });

    // Create and append the remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      removeBook(index); // Pass the index of the book to be removed
    });

    // Create and append the "Read" button
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read";
    readBtn.addEventListener("click", function () {
      book.status = "Read";
      displayBooks();
    });

    const actionTd = document.createElement("td");
    actionTd.appendChild(removeBtn);
    actionTd.appendChild(readBtn);
    bookRow.appendChild(actionTd);

    tbody.appendChild(bookRow);
  });
  table.appendChild(tbody);
  libraryContainer.appendChild(table);
}

// Add some sample books
// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "218", "Read");
// addBookToLibrary("Moby Dick", "Herman Melville", "635", "Not Read");
// addBookToLibrary("1984", "George Orwell", "328", "Read");

// Display the books
displayBooks();

//get the button and form elements
const addBookButton = document.getElementById("addBookBtn");
const bookForm = document.getElementById("addBookForm");

//Add event listener to button
addBookButton.addEventListener("click", function () {
  bookForm.style.display = "block";
});

//change form style back to none when submitted
const submitted = document.getElementById("submit");
submitted.addEventListener("click", function () {
  bookForm.style.display = "none";
});

//Event Listener to Form for submitting
bookForm.addEventListener("submit", function (event) {
  //Prevent the default form submission
  event.preventDefault();

  //Gather data from the form
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  //Create a book object
  const newFormBook = new Book(title, author, pages, status);

  //Add newBook to the Library
  myLibrary.push(newFormBook);
  displayBooks();

  //reset form for a new entry
  bookForm.reset();
});

function clearTable() {
  const libraryContainer = document.getElementById("libraryContainer");
  const oldTable = document.querySelector("table");
  if (oldTable) libraryContainer.removeChild(oldTable);
}
