import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar"> {/* Updated class name to lowercase for convention */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">User</Link>
        </li>
        <li>
          <Link to="/userLists">UserList</Link>
        </li>
        <li>
          <Link to="/authors">Author List</Link>
        </li>
        <li>
          <Link to="/books">Book List</Link>
        </li>
        <li>
          <Link to="/comments">View Comments</Link>
        </li>
        <li>
          <Link to="/book/new">Add New Book</Link>
        </li>
        <li>
          <Link to="/author/new">Add New Author</Link>
        </li>
        <li>
          <Link to="/user/new">New user</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;