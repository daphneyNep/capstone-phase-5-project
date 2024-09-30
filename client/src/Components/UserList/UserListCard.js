import React, { useState } from "react"; 
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserListCard = ({
  userList,
  user,
  someProp = "Default Value",
  onSelectedBook,
  books = [],
  onDeleteUserList,
  addComment,
  comments = [],
  addRatings = () => {},
  ratings = [],
}) => {
  // Move the console.log inside the component
  

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    addComment(userList.id, newComment);
    setNewComment("");
  };

  const handleRatingChange = (e) => setNewRating(e.target.value);
  const handleAddRating = () => {
    if (newRating.trim() === "") return;
    addRatings(userList.id, newRating);
    setNewRating("");
  };

  const handleOnDelete = () => {
    onDeleteUserList(userList.id);
  };

  const handleOnSelectedBook = (e) => {
    setSelectedBook(e.target.value);
    onSelectedBook(userList.id, e.target.value);
  };

  return (
    <li className="userList-card">
      <h2>{userList.user_id}</h2>
      <p>{someProp}</p>

      {user?.user_id ? (
        <div className="user-card">
          <h2>{`User ID: ${user.user_id}`}</h2>
          <p>{`Username: ${user.username}`}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}

      {/* Book selection */}
      <select value={selectedBook} onChange={handleOnSelectedBook}>
        <option value="">Select a book</option>
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>

      {selectedBook && (
        <div className="selected-book-details">
          <h3>Selected Book:</h3>
          <img
            src={books.find((book) => book.id === selectedBook)?.image_url}
            alt="Selected Book Cover"
          />
          <p>{books.find((book) => book.id === selectedBook)?.title}</p>
        </div>
      )}

      <input
        type="text"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Write a comment"
        id={`comment-input-${userList.id}`}
        name={`comment-${userList.id}`}
        autoComplete="off"
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <button onClick={handleOnDelete}>Delete</button>

      <h4>Comments</h4>
      <ul>
        {comments
          .filter((comment) => comment.userListId === userList.id)
          .map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>

      <input
        type="text"
        value={newRating}
        onChange={handleRatingChange}
        placeholder="Write a rating"
        id={`rating-input-${userList.id}`}
        name={`rating-${userList.id}`}
        autoComplete="off"
      />
      <button onClick={handleAddRating}>Add Ratings</button>

      <h4>Ratings</h4>
      <ul>
        {ratings
          .filter((rating) => rating.userListId === userList.id)
          .map((rating) => (
            <li key={rating.id}>{rating.content}</li>
          ))}
      </ul>

      <Link to={`/userLists/${userList.id}/comments`}>View Comments</Link>
      <Link to={`/userLists/${userList.id}/ratings`}>View Ratings</Link>
    </li>
  );
};

UserListCard.propTypes = {
  userList: PropTypes.object,
  user: PropTypes.shape({
    user_id: PropTypes.number,
    username: PropTypes.string,
  }),
  someProp: PropTypes.string,
  onSelectedBook: PropTypes.array.isRequired,
  onDeleteUserList: PropTypes.func.isRequired,
  addComment: PropTypes.func,
  comments: PropTypes.array,
  addRatings: PropTypes.func,
  ratings: PropTypes.array,
  books: PropTypes.array,
};

export default UserListCard;