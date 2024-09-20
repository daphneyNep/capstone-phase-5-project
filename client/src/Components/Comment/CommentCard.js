import { Link } from "react-router-dom";


function CommentCard({ comment }) {
    const { id, content, book_id, created_at, updated_at } = comment;

    return (
        <li className="card" id={id}>
            <figure className="comment">
                <img src={image_url || "default-image.jpg"} alt={name} /> {/* Fallback image */}
            </figure>
            <section className="details">
                <Link to={`/comment/${id}`}>
                    <h2>{book_id}</h2>
                    <h2>{content}</h2>
                </Link>
                <p>
                    {user_id}, {created_at}, {updated_at}
                </p>
            </section>
        </li>
    );
}

export default CommentCard;