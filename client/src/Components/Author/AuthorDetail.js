import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AuthorDetail() {
	const [author, setAuthor] = useState({});
	const [comment, setComment] = useState(""); // State for the new comment
	const [comments, setComments] = useState([]); // State for the list of comments
	const navigate = useNavigate(); // Initialize navigate

	const { id } = useParams();

	useEffect(() => {
		fetch(`http://127.0.0.1:5555/author/${author_id}`)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Failed to fetch");
				}
			})
			.then(data => setAuthor(data))
			.catch(() => navigate("/not-found")); // Redirect to /not-found on error
	}, [author_id, navigate]); // Added navigate to dependency array

	const { author_name, author_genre, image_url, author_id, bio, all_authors = [] } = author;

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
		<div className="author-detail" author_id={author_id}>
			<h1>{author_name}</h1>
            <h1>{author_genre}</h1>
            <h1>{bio}</h1>
			
            
			<div className="author-card">
				<figure className="image_url">
					<img src={image_url} alt={name} />
					<section>
						<p>Author_name: {author_name}</p>
						<p>Author_id: {author_id}</p>
                        <p>Author_genre: {author_genre}</p>
						<pre>{bio}</pre> {/* Use <pre> to preserve formatting */}
					</section>
				</figure>
				<section className="details">
					<h3 style={{ margin: "16px auto" }}>Author</h3>
					<ul className="author">
						{all_authors.map(s => (
							<li key={s.id}>
								<img
									width={"100px"}
									src={s.image_url}
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

export default AuthorDetail;