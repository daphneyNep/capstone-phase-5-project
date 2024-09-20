import React from "react";
function Search({ searchAuthor, searchBook }) {
    const [form, setForm] = useState('');

    
    const handleChange = (e) => {
        setForm(e.target.value);
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.trim()) {
            
            if (searchAuthor) {
                searchAuthor(form);
            }
            if (searchBook) {
                searchBook(form);
            }
        }
    };

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search Books, Authors, or Comments:</label>
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