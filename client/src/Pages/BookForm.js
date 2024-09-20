import React from "react"
import { useState} from "react"
import { useNavigate } from "react-router-dom"

const BookForm = ({ addBook }) => {
  const [BookForm, setBookForm] = useState({
    Id: "",
    Book_Title: "",
    Author_Id: "",
    Summary: ""
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setBookForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    // Ensure the book data is correctly formatted
    const bookData = {
      id: parseInt(BookForm.Book_Id, 10),  // Convert ID to integer
      book_title: BookForm.Book_Title,
      author_id: BookForm.Author_Id,
      summary: BookForm.Summary
    };
  
    fetch("http://localhost:5555/books", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookData)  // Send the data in JSON format
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(addedBook => {
        addBook(addedBook);
        navigate("/Books");
      })
      .catch(error => console.error('Error adding Book:', error));
  }


  return (
    <div className="new-book-form">
      <h2>Create Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Book_Id">Book_Id: </label>
          <input
            type="number"
            name="Book_Id"
            id="Book_Id"
            value={BookForm.Book_Id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Book_Title">Book_Title: </label>
          <input
            type="text"
            name="Book_Title"
            id="Book_Title"
            value={BookForm.Book_Title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Author_Id">Author_Id: </label>
          <input
            type="text"
            name="Author_Id"
            id="Author_Id"
            value={BookForm.Author_Id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Summary">Summary: </label>
          <textarea
            name="Summary"
            id="Summary"
            cols="30"
            rows="10"
            value={BookForm.Summary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};


export default BookForm