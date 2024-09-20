import React from "react";
import { Link } from "react-router-dom";


function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users"> All Users </Link>
        </li>
        <li>
        <Link to="/authors"> All Authors </Link>
        </li>
        <li>
        <Link to="/books"> All Books </Link>
        </li>
        <li>
          <Link to="/author/new">Add New Author</Link>
        </li>
        <li>
          <Link to="/book/new">Add New Book</Link>
        </li>

      </ul>
    </nav>
  );
}

export default NavBar;