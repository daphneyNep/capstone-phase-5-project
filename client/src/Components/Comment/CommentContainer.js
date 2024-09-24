import React from "react";
import CommentCard from "./CommentCard";

function CommentContainer({ comments, onDeleteComment }) {
    return (
        <section>
            <ul className='cards'>
                {comments.map(comment => (
                    <CommentCard 
                        key={comment.id} 
                        comment={comment} 
                        onDeleteComment={onDeleteComment} // Correct prop name
                    />
                ))}
            </ul>
        </section>
    );
}

export default CommentContainer;
