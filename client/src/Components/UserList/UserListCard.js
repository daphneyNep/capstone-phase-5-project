import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserListCard = ({
  userLists = [],
  user, // Expect a single user object, not an array
  onSelectedBook,
  books = [],
  onDeleteUserList,
  addComment,
  comments = [],
  addRatings = () => {},
  ratings = [],
}) => {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    addComment(userLists.id, newComment);
    setNewComment("");
  };

  const handleRatingChange = (e) => setNewRating(e.target.value);
  const handleAddRating = () => {
    if (newRating.trim() === "") return;
    addRatings(userLists.id, newRating);
    setNewRating("");
  };

  const handleOnDelete = () => {
    onDeleteUserList(userLists.id);
  };

  const handleOnSelectedBook = (e) => {
    setSelectedBook(e.target.value);
    onSelectedBook(userLists.id, e.target.value);
  };

  const selectedBookDetails = books.find((book) => book.id === Number(selectedBook));

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
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>

      {selectedBook && selectedBookDetails && (
        <div className="selected-book-details">
          <h3>Selected Book:</h3>
          <img
            src={selectedBookDetails.image_url}
            alt="Selected Book Cover"
            style={{ width: '100px', height: '150px' }}
          />
          <p>{selectedBookDetails.title}</p>
        </div>
      )}

      <input
        type="text"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Write a comment"
        id={`comment-input-${userLists.id}`}
        name={`comment-${userLists.id}`}
        autoComplete="off"
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <button onClick={handleOnDelete}>Delete</button>

      <h4>Comments</h4>
      <ul>
        {comments
          .filter((comment) => comment.userListId === userLists.id)
          .map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
      <Link to={`/userLists/${userLists.id}/comments`}>View Comments</Link>

      <input
        type="text"
        value={newRating}
        onChange={handleRatingChange}
        placeholder="Write a rating"
        id={`rating-input-${userLists.id}`}
        name={`rating-${userLists.id}`}
        autoComplete="off"
      />
      <button onClick={handleAddRating}>Add Ratings</button>

      <h4>Ratings</h4>
      <ul>
        {ratings
          .filter((rating) => rating.userListId === userLists.id)
          .map((rating) => (
            <li key={rating.id}>{rating.content}</li>
          ))}
      </ul>
    </li>
  );
};

UserListCard.propTypes = {
    userLists: PropTypes.array, // Make sure this matches the type being passed
    user: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onSelectedBook: PropTypes.func.isRequired,
    onDeleteUserList: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    addRatings: PropTypes.func.isRequired,
};

export default UserListCard;