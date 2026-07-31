import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Unauthorized from "../pages/Unauthorized";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} />

            {/* Protected Page */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* Unauthorized */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Catch All */}
            <Route path="*" element={<Home />} />

        </Routes>
    );
};

export default AppRoutes;
