import React from "react";
import BookCard from "./BookCard";

function BookContainer({ books, onDeleteBook }) {
    return (
        <section>
            <ul className='cards'>
                {books.map(book => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        onDeleteBook={onDeleteBook} // Correct prop name
                    />
                ))}
            </ul>
        </section>
    );
}

export default BookContainer;