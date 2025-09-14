import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../context/useAuth';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

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
                {isAuthenticated && (
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
                )}
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
                {!isAuthenticated ? (
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
                ) : (
                    <li>
                        <button onClick={logout} className='home-navbar-link logout-button'>
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;