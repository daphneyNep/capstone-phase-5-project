import React from 'react';
import CommentContainer from './CommentContainer';

function CommentPage({ comments }) {
  // Ensure that each comment has an image_url property
  const enrichedComments = comments.map(comment => ({
    ...comment,
    image_url: comment.image_url || 'default-image-url.jpg', // Add a default image URL if none exists
  }));

  return (
    <CommentContainer comments={enrichedComments} />
    
  );
}

export default CommentPage;