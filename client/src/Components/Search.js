import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion

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

    // Define animation variants for the input and button
    const searchVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    const buttonVariants = {
        hover: { scale: 1.1, transition: { duration: 0.3 } },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div 
          className="searchbar" 
          initial="hidden" 
          animate="visible" 
          variants={searchVariants}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search Books, Authors and Users:</label>
                <motion.input
                    type="text"
                    id="search"
                    placeholder="Type to search..."
                    value={form}
                    onChange={handleChange}
                    whileFocus={{ scale: 1.05 }} // Input grows slightly on focus
                    transition={{ duration: 0.3 }}
                />
                <motion.button 
                    type="submit"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                >
                    Search
                </motion.button>
            </form>
        </motion.div>
    );
}

export default Search;