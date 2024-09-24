import React from 'react';
import CommentContainer from './CommentContainer';

const CommentPage = ({ comments }) => {
  const handleDeleteComment = (id) => {
    // Logic to delete the comment, e.g., updating state
    console.log(`Deleting comment with id: ${id}`);
  };

  return (
    <div>
      <h1>Comments</h1>
      <CommentContainer 
        comments={comments} 
        onDeleteComment={handleDeleteComment} // Pass the delete function
      />
    </div>
  );
};

export default CommentPage;