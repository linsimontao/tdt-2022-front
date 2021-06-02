import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>TOUR de TOHOKU 2021</h1>
            <div className="links">
                <Link to="/">Course</Link>
                <Link to="/live">LIVE</Link>
                <Link to="/about">ABOUT</Link>
            </div>
        </nav>
    );
}

export default Navbar;