import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function UserDetail() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`http://127.0.0.1:5555/user/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error("Unauthorized access. Please login.");
                    }
                    throw new Error("Failed to fetch user data");
                }
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "User not found");
                setLoading(false);
            });
    }, [id, navigate]);

    const logout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>No user data available</p>;
    }

    const { username, password } = user;

    return (
        <div className="user-detail" id={id}>
            <h1>{username}</h1>
            <h1>{password}</h1>
            <div className="user-card"></div>
            <button onClick={logout}>Logout</button> {/* Logout button */}
        </div>
    );
}

export default UserDetail;
