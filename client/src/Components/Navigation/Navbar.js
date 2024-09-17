import { Link } from "react-router-dom"

const Navbar = () => {
    return(
        <ul>
            <li><Link to="/">Header</Link></li>
            <li><Link to="/Member-New">Create Member</Link></li>
            <li><Link to="/Book-New">Create Book</Link></li>
            <li><Link to="/Members">List of Members</Link></li>
            <li><Link to="/Books">List of Books</Link></li>
            <nav><Link to="/search">Search Books</Link></nav>
        </ul>
    )
}

export default Navbar
