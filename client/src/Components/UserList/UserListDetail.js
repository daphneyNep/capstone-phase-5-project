import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function UserListDetail() {
	const [userList, setUserList] = useState({}); // Fix state name to userList
	const [comment, setComment] = useState(""); // State for the new comment
	const [comments, setComments] = useState([]); // State for the list of comments
	const navigate = useNavigate(); // Initialize navigate

	const { id } = useParams();

	useEffect(() => {
		fetch(`http://127.0.0.1:5555/user/${id}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Failed to fetch");
				}
			})
			.then((data) => setUserList(data)) // Fix to setUserList
			.catch(() => navigate("/not-found")); // Redirect to /not-found on error
	}, [id, navigate]); // Added navigate to dependency array

	const { user_id, book_id, rating, all_users = [], image_url, name } = userList; // Fix: Destructure from userList

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
		<div className="user-detail" id={id}>
			<p>{user_id}</p>
			<p>{book_id}</p>
				<div className="user-card">
					<figure className="image_url">
						{image_url && <img src={image_url} alt={name} />} {/* Fix: Handle image_url properly */}
							<section>
								<p>{book_id}</p>
								<p>{user_id}</p>
								<p>{rating}</p>
							</section>
					</figure>
						<section className="details">
							<h3 style={{ margin: "16px auto" }}>Author</h3>
							<ul className="author">
								{all_users.map((a) => (
									<li key={a.id}>
								<img
									width={"100px"}
									src={a.image_url}
									alt={a.name}
								/>
								<div className="a-user">
									<Link to={`/authors/${a.id}`}> {/* Fix: Use correct id for the author */}
										<p style={{ fontStyle: "italic" }}>{a.name}</p> {/* Fix: Access correct field */}
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

export default UserListDetail;