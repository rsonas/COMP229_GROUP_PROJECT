import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    COMP229 Project
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link className="nav-link" to="/">
                        Home
                    </Link>

                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>

                    {!isAuthenticated ? (
                        <>
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>

                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            className="btn btn-outline-light ms-3"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </nav>
    );
};

export default Navbar;