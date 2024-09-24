import React from "react";
import PropTypes from "prop-types"; // Import PropTypes if you haven't already
import BookCard from "./BookCard";

function BookContainer({ books = [], onDeleteBook, comments, addComment }) { // Default to an empty array

  return (
    <section>
      <ul className='cards'>
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            deleteBook={onDeleteBook} // Use correct prop name for deleting
            addComment={addComment} // Pass addComment function
            comments={comments} // Pass comments to BookCard
          />
        ))}
      </ul>
    </section>
  );
}

// Define PropTypes
BookContainer.propTypes = {
  books: PropTypes.array.isRequired, // Ensure books is required
  onDeleteBook: PropTypes.func.isRequired, // Ensure onDeleteBook is a function
  comments: PropTypes.array, // Ensure comments is an array
  addComment: PropTypes.func.isRequired // Ensure addComment is a function
};

export default BookContainer;