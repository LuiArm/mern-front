import React, { useEffect } from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  const url = "https://book-site-la.herokuapp.com"

  // holds state for list of books 
  const [books, setBooks] = React.useState([])

  // create a variable that will be used in the create form
  const emptyBook = {
    name: "",
    genre: "",
    img: ""
  }

  // state represents the selected book for when we update or delete 
  const [selectedBook, setselectedBook] = React.useState(emptyBook)

  //Funcstion to get list of books 
  const getBooks = () => {
    fetch(url + "/book/")
    .then((response) => response.json())
    .then((data) => {
      setBooks(data)
    })
  }

  // useEffect to get the data right away, empty array to prevent infinite loop 
  React.useEffect(() => {getBooks()}, [])

  // handleCreate function to deal with create form submission
  const handleCreate = (newBook) => {
    fetch(url + "/book/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newBook)
    })
    .then(() => getBooks())
  }

  // handleUpdate form edit form is submitted 
  const handleUpdate = (book) => {
    fetch(url + "/book/" + book._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(book)
    })
    .then(() => getBooks())
  }

  // function to specify which book we are updating 
  const selectBook = (book) => {setselectedBook(book)}

  // function to delete a single book 
  const deleteBook = (book) => {
    fetch(url + "/book/" + book._id, {
      method: "delete"
    })
    .then(() => {
      getBooks()
    })
  }

  return (
    <div className="App">
      <h1>Favorite books</h1>
      <hr />
      <Link to="/create">
        <button>Add Book</button>
      </Link>
      <main>
        <Switch>
          <Route exact path ="/" render={(rp) => <Display
          {...rp}
          books={books}
          selectBook={selectBook}
          deleteBook={deleteBook}
        />} />
        <Route exact path="/create" render={(rp) => (
          <Form {...rp} label="create" book={emptyBook} handleSubmit={handleCreate} />
        )} />
        <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" book={selectedBook} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
