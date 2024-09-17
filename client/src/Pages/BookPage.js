import React from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";
import Search from "./Search";




const BookPage = (books, setTerm, term, addBook, deleteBook) => {

    return (
        <div>
            <BookForm addBook={addBook}/>
            <Search setTerm={setTerm} term={term}/>
            <BookList books={books} deletebook={deleteBook} />
        </div>
    )
}

export default BookPage