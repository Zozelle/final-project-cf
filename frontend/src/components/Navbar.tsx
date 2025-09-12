import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const isAuthenticated = false; // Placeholder, replace with auth context later

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cats">Cats</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/reservation">Reservation</Link></li>
                {isAuthenticated ? (
                    <li><button>Logout</button></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
