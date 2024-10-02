import React from 'react';
import CommentCard from './CommentCard';

const CommentContainer = ({ comments, onDeleteComment, image_url }) => {
  // Ensure comments is an array
  if (!comments || !Array.isArray(comments)) {
    return <p>No comments available.</p>;
  }

  return (
    <div>
      {comments.map(comment => (
        <CommentCard 
          key={comment.id} // Use a unique key for each comment
          comment={comment} 
          image_url={image_url}
          onDeleteComment={onDeleteComment} // Pass the function to CommentCard
        />
      ))}
    </div>
  );
};

export default CommentContainer;
