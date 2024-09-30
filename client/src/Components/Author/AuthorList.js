import React, { useEffect, useState } from 'react';
import AuthorContainer from './AuthorContainer';
import AuthorForm from './AuthorForm';
import Search from './Search'; // Ensure this import is correct

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:5555/authors');
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                setAuthors(data);
                console.log(data); // Log fetched authors
            } catch (error) {
                console.error('Error fetching authors:', error);
                setError('Failed to fetch authors. Please try again later.');
            }
        };

        fetchAuthors(); // Fetch authors on component mount
    }, []);

    const addAuthor = (newAuthor) => {
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]); // Add new author to the list
    };

    const onDeleteAuthor = async (authorId) => {
        try {
            const response = await fetch(`http://localhost:5555/authors/${authorId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete author');
            }

            setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
            console.log(`Deleted author with id: ${authorId}`);
        } catch (error) {
            console.error('Error deleting author:', error);
            setError('Failed to delete author. Please try again later.');
        }
    };

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase()) // Assuming `author.name` is correct
    );

    return (
        <div>
            <h1>Author List</h1>
            {error && <div className="error">{error}</div>} {/* Display error message */}
            <AuthorForm addAuthor={addAuthor} />
            <Search onSearch={setSearchTerm} />
            {filteredAuthors.length > 0 ? (
                <AuthorContainer authors={filteredAuthors} onDeleteAuthor={onDeleteAuthor} />
            ) : (
                <div>No authors available</div>
            )}
        </div>
    );
};

export default AuthorList;