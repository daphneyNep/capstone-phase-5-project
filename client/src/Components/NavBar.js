import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NavBar() {
  // Animation variants for the list items
  const navVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <motion.nav className="navbar" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 50 }}> 
      <motion.ul
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }} // Animate children with delay between them
      >
        <motion.li variants={navVariants}>
          <Link to="/">Home</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/users">User</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/userLists">UserList</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/authors">Author List</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/books">Book List</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/comments">View Comments</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/book/new">Add New Book</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/author/new">Add New Author</Link>
        </motion.li>
        <motion.li variants={navVariants}>
          <Link to="/user/new">New user</Link>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
}

export default NavBar;