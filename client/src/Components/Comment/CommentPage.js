import React from 'react';
import CommentContainer from './CommentContainer';

function CommentPage({ comments }) {
  return (
    <CommentContainer comments={comments} />
  );
}

export default CommentPage;