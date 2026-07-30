import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="container mt-5 text-center">

            <h1 className="mb-4">
                Welcome to the COMP229 Project
            </h1>

            {isAuthenticated ? (
                <>
                    <h4 className="text-success">
                        Welcome back, {user?.username}!
                    </h4>

                    <p className="mt-3">
                        You are currently logged in.
                    </p>

                    <Link
                        to="/profile"
                        className="btn btn-primary mt-3"
                    >
                        Go to My Profile
                    </Link>
                </>
            ) : (
                <>
                    <p className="lead">
                        Welcome! Please login or register to access your profile and manage your account.
                    </p>

                    <div className="mt-4">

                        <Link
                            to="/login"
                            className="btn btn-primary me-3"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-outline-primary"
                        >
                            Register
                        </Link>

                    </div>
                </>
            )}

        </div>
    );
};

export default Home;