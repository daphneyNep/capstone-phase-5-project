import React from 'react';
import CommentCard from './CommentCard';

const CommentContainer = ({ comments, onDeleteComment }) => {
  // Ensure comments is an array
  if (!comments || !Array.isArray(comments)) {
    return <p>No comments available.</p>;
  }

  return (
    <div>
      {comments.map(comment => (
        <CommentCard 
          key={comment.id} 
          comment={comment} 
          onDeleteComment={onDeleteComment} // Pass the function to CommentCard
        />
      ))}
    </div>
  );
};

export default CommentContainer;
