import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="container mt-5">

            {/* Hero Banner */}

            <div className="text-center mb-5">

                <img
                    src="/hero.avif"
                    alt="SportsPass Hero"
                    className="img-fluid rounded shadow"
                    style={{
                        width: "100%",
                        maxHeight: "430px",
                        objectFit: "cover"
                    }}
                />

            </div>

            {/* Welcome */}

            <div className="text-center">

                <h1
                    className="display-3 fw-bold"
                    style={{ color: "#142850" }}
                >
                    WELCOME TO SPORTSPASS
                </h1>

                <h3
                    className="mt-3 fw-semibold"
                    style={{ color: "#F58220" }}
                >
                    Your Pass to Every Game.
                </h3>

                <p
                    className="lead mx-auto mt-4"
                    style={{
                        maxWidth: "850px"
                    }}
                >
                    SportsPass is your all-in-one platform for discovering,
                    booking, and managing tickets for your favorite sporting
                    events. Whether you're cheering courtside, rinkside,
                    or from the stadium stands, SportsPass makes securing
                    your next game day experience simple, fast, and secure.
                </p>

            </div>

            <hr className="my-5" />

            {!isAuthenticated ? (

                <div
                    className="card shadow border-0 mx-auto"
                    style={{
                        maxWidth: "650px",
                        borderRadius: "18px"
                    }}
                >

                    <div className="card-body p-5">

                        <h2
                            className="text-center mb-4"
                            style={{ color: "#142850" }}
                        >
                            Why Choose SportsPass?
                        </h2>

                        <div className="fs-5">

                            <p>🏟️ Browse upcoming sporting events</p>

                            <p>🎟️ Purchase tickets securely</p>

                            <p>📅 Manage your bookings with ease</p>

                            <p>🔔 Stay updated on upcoming games</p>

                        </div>

                        <div className="text-center mt-5">

                            <Link
                                to="/login"
                                className="btn btn-primary btn-lg me-3"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-outline-primary btn-lg"
                            >
                                Register
                            </Link>

                        </div>

                    </div>

                </div>

            ) : (

                <div
                    className="card shadow border-0 mx-auto"
                    style={{
                        maxWidth: "650px",
                        borderRadius: "18px"
                    }}
                >

                    <div className="card-body text-center p-5">

                        <h2
                            style={{ color: "#142850" }}
                        >
                            Welcome back,
                        </h2>

                        <h1
                            className="fw-bold"
                            style={{ color: "#F58220" }}
                        >
                            {user?.username}
                        </h1>

                        <p className="mt-3">

                            You're successfully logged in!

                            <br />

                            Visit your profile to manage your account.

                        </p>

                        <Link
                            to="/profile"
                            className="btn btn-primary btn-lg mt-3"
                        >
                            My Profile
                        </Link>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Home;