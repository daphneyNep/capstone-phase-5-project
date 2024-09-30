import React from 'react';
import AuthorCard from './AuthorCard';
import PropTypes from 'prop-types';

const AuthorContainer = ({ authors = [], onDeleteAuthor }) => {
    return (
        <section>
            <h1>Authors</h1>
            <ul className='cards'>
                {authors.map((author) => (
                    <AuthorCard
                        key={author.id}
                        author={author}
                        onDeleteAuthor={onDeleteAuthor} // Pass onDeleteAuthor function
                        
                    />
                ))}
            </ul>
        </section>
    );
};

AuthorContainer.propTypes = {
    authors: PropTypes.array.isRequired, // Ensure authors is required
    onDeleteAuthor: PropTypes.func.isRequired, // Ensure onDeleteAuthoris a function
};

export default AuthorContainer;