import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function UserDetail() {
	const [user, setUser] = useState({});
	const navigate = useNavigate(); // Initialize navigate

	const { id } = useParams();

	useEffect(() => {
		fetch(`http://127.0.0.1:5555/user/${id}`)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Failed to fetch");
				}
			})
			.then(data => setUser(data))
			.catch(() => navigate("/not-found")); // Redirect to /not-found on error
	}, [id, navigate]); // Added navigate to dependency array

	const { user_id, username, password, all_users = [] } = user;

	
	return (
        <div className= "userList-detail" id={id}>
            <p>{user_id}</p>
            <p>{username}</p>
            <p>{password}</p>

            <div className= "userList-card">
                <section>
				<p>{book_id}</p>
				<p>{user_id}</p>
                    <p>Rating:</p>
                    <pre>{rating}</pre>
            </section>
            </div>
		</div>
	)

}
export default UserDetail