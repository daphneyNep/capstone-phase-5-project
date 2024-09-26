import React, { useState, useEffect } from 'react';
import AuthorCard from './AuthorCard';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch authors from your API
        const fetchAuthors = async () => {
            try {
                const response = await fetch('/api/authors'); // Update with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAuthors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthors();
    }, []);

    const deleteAuthor = async (id) => {
        try {
            const response = await fetch(`/api/authors/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the author');
            }

            // Use functional form of setAuthors to ensure we have the latest state
            setAuthors((prevAuthors) => prevAuthors.filter(author => author.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    if (loading) {
        return <div>Loading authors...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Author List</h1>
            <ul>
                {authors.map(author => (
                    <li key={author.id}>
                        <AuthorCard author={author} />
                        <button onClick={() => deleteAuthor(author.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorList;