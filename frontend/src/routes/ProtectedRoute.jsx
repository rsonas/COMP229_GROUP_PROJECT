import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="container mt-5 text-center">

                <h2>Profile</h2>

                <p className="mt-3">
                    Please{" "}
                    <Link to="/login">Login</Link>
                    {" "}or{" "}
                    <Link to="/register">Register</Link>
                    {" "}to view your profile.
                </p>

            </div>
        );
    }

    return children;
};

export default ProtectedRoute;