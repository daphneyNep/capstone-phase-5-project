import React from "react";
// import BookCard from "./Book/BookCard";
import LibraryPage from './LibraryPage';
import About from "./About";
import Search from './Search';

function Home() {

    
    // const [books, setBooks] = useState([]);
    // const [error, setError] = useState(null);

    // // Function to handle the deletion of a book
    // const onDeleteBook = (bookId) => {
    //     fetch(`http://127.0.0.1:5555/books/${bookId}`, {
    //         method: 'DELETE',
    //     })
    //     .then(res => {
    //         if (!res.ok) {
    //             throw new Error(`HTTP error! Status: ${res.status}`);
    //         }
    //         setBooks(books.filter(book => book.id !== bookId));
    //     })
    //     .catch(err => {
    //         setError(err.message);
    //         console.error("Delete error:", err);
    //     });
    // };

    // // Function to handle adding a new book
    // const handleAddBook = (newBookTitle) => {
    //     const newBook = { id: books.length + 1, title: newBookTitle, author: "", genre: "", summary: "", image_url: "" };
    //     setBooks([...books, newBook]);
    // };

    // // Function to handle adding a comment
    // const handleAddComment = (bookId, comment) => {
    //     fetch(`http://127.0.0.1:5555/books/${bookId}/comments`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ content: comment }),
    //     })
    //     .then(res => {
    //         if (!res.ok) {
    //             throw new Error(`HTTP error! Status: ${res.status}`);
    //         }
    //         return res.json();
    //     })
    //     .then(newComment => {
    //         setBooks(books.map(book => {
    //             if (book.id === bookId) {
    //                 return {
    //                     ...book,
    //                     comments: [...(book.comments || []), newComment]
    //                 };
    //             }
    //             return book;
    //         }));
    //     })
    //     .catch(err => {
    //         setError(err.message);
    //         console.error("Add comment error:", err);
    //     });
    // };

    // // Function to handle updating a book
    // const handleUpdateBook = (updatedBook) => {
    //     setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
    // };

    // useEffect(() => {
    //     fetch("http://127.0.0.1:5555/books")
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error(`HTTP error! Status: ${res.status}`);
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             if (Array.isArray(data)) {
    //                 setBooks(data);
    //             } else {
    //                 throw new Error("Unexpected data format");
    //             }
    //         })
    //         .catch(err => {
    //             setError(err.message);
    //             console.error("Fetch error:", err);
    //         });
    // }, []);

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    

    return (
        <div>
            <section>
                <About />
            </section>

            <section>
                <LibraryPage />
            </section>
            
            <section>
                <Search />
            </section>
          

            {/* <section>
                <h2>Books</h2>
                {books.length > 0 ? (
                    books.map(book => (
                        <BookCard 
                            key={book.id} 
                            book={book} 
                            // onDeleteBook={onDeleteBook}
                            // addBook={handleAddBook}
                            // comments={book.comments || []} // Ensure comments is always an array
                            // addComments={handleAddComment} // Pass the addComments handler
                            // updateBook={handleUpdateBook}  // Pass the updateBook handler
                        />
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </section> */}
        </div>
    );
}

export default Home;