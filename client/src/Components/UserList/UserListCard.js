import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserListCard = ({
  userLists = [],
  user = {},
  onSelectedBook,
  books = [],
  onDeleteUserList,
  addComments = () => {},
  comments = [],
}) => {
  const [newComment, setNewComment] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  console.log(selectedBook)
  // Set localComments when comments prop changes
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user.id) {
      setError("User list ID is undefined.");
      return;
    }

    const book=books.find(book=> book.id===parseInt(selectedBook))
    console.log(book)
    if (newComment.trim()) {
      const commentData = { content: newComment, book_id: selectedBook, user_id: user.id, image_url: book.image_url };

      try {
        const response = await fetch(
          `http://127.0.0.1:5555/userlists/${user.id}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit comment");
        }

        const addedComment = await response.json();
        setLocalComments((prevComments) => [...prevComments, addedComment]);
        setNewComment("");
        setError(null);
      } catch (err) {
        setError("Failed to submit comment");
      }
    }
  };

  const handleOnDelete = () => {
    onDeleteUserList(userLists.id);
  };

  const handleOnSelectedBook = (e) => {
    const selectedBookId = e.target.value;
    setSelectedBook(selectedBookId);
    
    // Notify the parent component
    onSelectedBook(selectedBookId);
    
  };

  // Find the details of the selected book
  const selectedBookDetails = books.find(
    (book) => book.id === Number(selectedBook)
  );

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <li className="UserLists-card">
      <h2>{userLists.userList}</h2>

      {user ? (
        <>
          <h2>{`User Id: ${user.id}`}</h2>
          <h2>{`User username: ${user.username}`}</h2>
        </>
      ) : (
        <p>No user data available</p>
      )}

      <select value={selectedBook} onChange={handleOnSelectedBook}>
        <option value="">Select a book</option>
        {books.length > 0 ? (
          books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))
        ) : (
          <option disabled>No books available</option>
        )}
      </select>

      {selectedBook && selectedBookDetails && (
        <div className="selected-book-details">
          <h3>Selected Book:</h3>
          <img
            src={selectedBookDetails.image_url}
            alt="Selected Book Cover"
            style={{ width: "100px", height: "150px" }}
          />
          <p>{selectedBookDetails.title}</p>
        </div>
      )}

      <h1>Add a New Comment</h1>
      <section className="comments">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            id="newComment"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
            rows="4"
            style={{ width: "100%" }}
          />
          <button type="submit">Submit</button>
        </form>
        {error && <div className="error">{error}</div>}
        <ul>
          {localComments.map((com, index) => (
            <li key={com.id || index}>{com.content || com}</li>
          ))}
        </ul>
      </section>

      <button onClick={handleOnDelete}>Delete</button>

      <Link to={`/userLists/${user.id}/comments`}>View Comments</Link>

    </li>
  );
};

UserListCard.propTypes = {
  userLists: PropTypes.array.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }),
  books: PropTypes.array.isRequired,
  onSelectedBook: PropTypes.func.isRequired,
  onDeleteUserList: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default UserListCard;