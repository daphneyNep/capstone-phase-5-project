import React from "react";
import PropTypes from "prop-types"; // Make sure to import PropTypes

const UserCard = ({ user, handleDeleteUser, handleEditUser }) => {
  if (!user) {
    return null; // Handle loading state if needed
  }

  return (
    <div className="user-card" id={`user-${user.id}`} name={user.username}>
      <h3>{user.username}</h3>
      <button onClick={() => handleEditUser(user)}>Edit</button>
      <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
    </div>
  );
};

// Define prop types for type checking
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
};

export default UserCard;