import React from "react";
import AuthorCard from "./AuthorCard";

function AuthorContainer({ authors, onDeleteAuthor }) {
    return (
        <section>
            <ul className='cards'>
                {authors.map(author => (
                    <AuthorCard 
                        key={authors.id} 
                        author={authors} 
                        onDeleteAuthor={onDeleteAuthor} 
                    />
                ))}
            </ul>
        </section>
    );
}

export default AuthorContainer;