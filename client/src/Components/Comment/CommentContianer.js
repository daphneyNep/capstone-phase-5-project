import CommentCard from "./CommentCard";
import React from "react";

function CommentContainer({ comment }) {
    return (
      <section>
           <ul className='cards'>
               {comment.map(comment => <CommentCard  key={comment.id} comment={comment}  />)}
           </ul>
       </section>
    )
  }

export default CommentContainer;