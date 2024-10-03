import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentContainer from './CommentContainer';

function CommentPage({ initialComments }) {
  const { userListId } = useParams();
  const [comments, setComments] = useState(initialComments || []);
  const [error, setError] = useState(null); // Add error state
  

  useEffect(() => {
    // Check if userListId is defined
    if (userListId) {
        fetch(`http://localhost:5555/userLists/${userListId}/comments`)
            .then(response => {
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                return response.json();
            })
            .then(data => {
                // Handle the data here
                console.log(data);
            })
            .catch(error => console.error('Fetch error:', error));
    } else {
        console.error('userListId is undefined');
    }
}, [userListId]);

  // Ensure that each comment has an image_url property
  const enrichedComments = comments.map(comment => ({
    ...comment,
    image_url: comment.image_url || 'default-image-url.jpg',
  }));

  return (
    <div>
      <h1>Comments for User List {userListId}</h1>
      {error && <div className="error">{error}</div>} {/* Display error message */}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <p>No comments available</p>
      )}
      <CommentContainer comments={enrichedComments} />
    </div>
  );
}

export default CommentPage;