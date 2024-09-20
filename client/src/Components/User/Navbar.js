import { Link } from "react-router-dom"

const Navbar = () => {
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/User-New">Create User</Link></li>
            <li><Link to="/Book-New">Create Book</Link></li>
            <li><Link to="/Author-New">Create Author</Link></li>
            <li><Link to="/Comment-New">Create Comment</Link></li>
            <li><Link to="/Users">List of Users</Link></li>
            <li><Link to="/Books">List of Books</Link></li>
            <li><Link to="/Authors">List of Authors</Link></li>
            <li><Link to="/Comments">List of Comments</Link></li>
            <nav><Link to="/search">Search Books</Link></nav>
            <nav><Link to="/search">Search Authors</Link></nav>
        </ul>
    )
}

export default Navbar
