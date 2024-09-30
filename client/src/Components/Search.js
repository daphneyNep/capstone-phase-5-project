import React, { useState } from "react";

function Search({ onSearch }) {
    const [form, setForm] = useState('');

    const handleChange = (e) => {
        setForm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.trim()) {
            // Call onSearch with the search term
            onSearch(form);
        }
    };

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search Books, Authors, Comments or Users:</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Type to search..."
                    value={form}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default Search;