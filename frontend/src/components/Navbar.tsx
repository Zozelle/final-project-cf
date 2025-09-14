import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
    // const isAuthenticated = false; // Placeholder, replace with auth context later

    return (
        <nav className='home-navbar'>
            <ul className='home-navbar-ul'>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'home-navbar-link active-link' : 'home-navbar-link'
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/cats" end
                        className={({ isActive }) =>
                            isActive ? 'home-navbar-link active-link' : 'home-navbar-link'
                        }
                    >
                        Meet our cats
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/reservation" end
                        className={({ isActive }) =>
                            isActive ? 'home-navbar-link active-link' : 'home-navbar-link'
                        }
                    >
                        Book a visit
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/menu" end
                        className={({ isActive }) =>
                            isActive ? 'home-navbar-link active-link' : 'home-navbar-link'
                        }
                    >
                        Check the menu
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/login" end
                        className={({ isActive }) =>
                            isActive ? 'home-navbar-link active-link' : 'home-navbar-link'
                    }
                    >
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
