import CommentCard from "./CommentCard";

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