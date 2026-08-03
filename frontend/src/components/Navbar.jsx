import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../context/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm">
            <div className="container">

                {/* Logo */}
                <Link
                    className="navbar-brand"
                    to="/"
                    onClick={closeMenu}
                >
                    <img
                        src="/logo.png"
                        alt="SportsPass Logo"
                        className="logo"
                    />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="navbar-toggler"
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="toggler-line" />
                    <span className="toggler-line" />
                    <span className="toggler-line" />
                </button>

                {/* Navigation Links */}
                <div
                    className={`collapse navbar-collapse ${
                        menuOpen ? "show" : ""
                    }`}
                >
                    <div className="navbar-nav ms-auto align-items-lg-center">

                        <NavLink
                            className="nav-link"
                            to="/"
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            className="nav-link"
                            to="/events"
                            onClick={closeMenu}
                        >
                            Events
                        </NavLink>

                        {isAuthenticated && (
                            <>
                                <NavLink
                                    className="nav-link"
                                    to="/dashboard"
                                    onClick={closeMenu}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    className="nav-link"
                                    to="/profile"
                                    onClick={closeMenu}
                                >
                                    Profile
                                </NavLink>
                            </>
                        )}

                        {!isAuthenticated ? (
                            <>
                                <NavLink
                                    className="nav-link"
                                    to="/login"
                                    onClick={closeMenu}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    className="nav-link"
                                    to="/register"
                                    onClick={closeMenu}
                                >
                                    Register
                                </NavLink>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-outline-light logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}

                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;