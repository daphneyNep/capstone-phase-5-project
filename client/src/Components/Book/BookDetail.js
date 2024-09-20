import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetail() {
	const [book, setBook] = useState({});
	const [comment, setComment] = useState(""); // State for the new comment
	const [comments, setComments] = useState([]); // State for the list of comments
	const navigate = useNavigate(); // Initialize navigate

	const { id } = useParams();

	useEffect(() => {
		fetch(`http://127.0.0.1:5555/book/${id}`)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Failed to fetch");
				}
			})
			.then(data => setBook(data))
			.catch(() => navigate("/not-found")); // Redirect to /not-found on error
	}, [book_id, navigate]); // Added navigate to dependency array

	const { title, image_url, author_id, book_id, summary, all_books = [] } = book;

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		if (comment.trim()) {
			setComments([...comments, comment]);
			setComment(""); // Clear the input field after submitting
		}
	};

	return (
		<div className="book-detail" id={id}>
			<h1>{title}</h1>
			<p>{summary}</p>
            
			<div className="book-card">
				<figure className="image">
					<img src={image_url} alt={name} />
					<section>
						<p>{book_id}</p>
						<p>{title}</p>
						<p>{author_id}</p>
						<p>Summary:</p>
						<pre>{summary}</pre> {/* Use <pre> to preserve formatting */}
					</section>
				</figure>
				<section className="details">
					<h3 style={{ margin: "16px auto" }}>Author</h3>
					<ul className="author">
						{all_books.map(s => (
							<li key={s.id}>
								<img
									width={"100px"}
									src={s.image}
									alt={s.name}
								/>
								<div className="s-user">
									<Link to={`/authors/${author_id}`}>
										<p style={{ fontStyle: "italic" }}>{author_id.name}</p>
									</Link>
								</div>
							</li>
						))}
					</ul>
				</section>
			</div>

			<section className="comments">
				<h2>Submit your comment!</h2>
				<form onSubmit={handleCommentSubmit}>
					<textarea
						value={comment}
						onChange={handleCommentChange}
						placeholder="Add a comment"
						rows="4"
						style={{ width: "100%" }}
					/>
					<button type="submit">Submit</button>
				</form>
				<ul>
					{comments.map((com, index) => (
						<li key={index}>{com}</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default BookDetail;
