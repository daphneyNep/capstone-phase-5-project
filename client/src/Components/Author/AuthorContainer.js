import React from "react";
import AuthorCard from "./AuthorCard";

function AuthorContainer({ authors, onDeleteAuthor }) {
    return (
        <section>
            <ul className="cards">
                {authors.map(author => (
                    <AuthorCard 
                        key={author.id}  // Use author.id instead of authors.id
                        author={author}  // Pass the current author, not the whole authors array
                        onDeleteAuthor={onDeleteAuthor} 
                    />
                ))}
            </ul>
        </section>
    );
}

export default AuthorContainer;