import React from "react"
import { useState} from "react"
import { useNavigate } from "react-router-dom"

const BookForm = ({ addBook }) => {
  const [BookForm, setBookForm] = useState({
    Id: "",
    Title: "",
    Author: "",
    Content: ""
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
      id: parseInt(BookForm.Id, 10),  // Convert ID to integer
      title: BookForm.Title,
      author: BookForm.Author,
      content: BookForm.Content
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
          <label htmlFor="Id">Id: </label>
          <input
            type="number"
            name="Id"
            id="Id"
            value={BookForm.Id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Title">Title: </label>
          <input
            type="text"
            name="Title"
            id="Title"
            value={BookForm.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Author">Author: </label>
          <input
            type="text"
            name="Author"
            id="Author"
            value={BookForm.Author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Content">Content: </label>
          <textarea
            name="Content"
            id="Content"
            cols="30"
            rows="10"
            value={BookForm.Content}
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