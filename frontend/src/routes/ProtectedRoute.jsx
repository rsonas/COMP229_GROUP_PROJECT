/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Displays when a user is not registered or signed in

*/

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
                <h2>Login Required</h2>

                <p className="mt-3">
                    Please{" "}
                    <Link to="/login">Login</Link>
                    {" "}or{" "}
                    <Link to="/register">Register</Link>
                    {" "}to continue.
                </p>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;