import React from "react";

const Display = (props) => {
  // destruct the books from props
  const { books } = props
  // Returns the JSX for when you have books 
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {books.map((book) => ( // using regular brackets vs curly braces is an implied return
        <article key={book.id}>
          <img src={book.img}/>
          <h1>{book.name}</h1>
          <h3>{book.genre}</h3>
          <button onClick={() =>{
            props.selectBook(book)
            props.history.push("/edit")
          }}>
            edit 
          </button>
          <button onClick={() => {
            props.deleteBook(book)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )

const loading = () => <h1>Loading</h1>

return books.length > 0 ? loaded() : loading()
};

export default Display;
