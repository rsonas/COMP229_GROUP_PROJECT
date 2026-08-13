/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Handles routes for each page

*/

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Unauthorized from "../pages/Unauthorized";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import CreateEvent from "../pages/CreateEvent";
import EditEvent from "../pages/EditEvent";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route
                path="/events/:eventId"
                element={<EventDetails />}
            />

            {/* Protected Pages */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/events/create"
                element={
                    <ProtectedRoute>
                        <CreateEvent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/events/:eventId/edit"
                element={
                    <ProtectedRoute>
                        <EditEvent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard"
                element={<ProtectedRoute>
                        <Dashboard />
                        </ProtectedRoute>
                }
            />

            {/* Unauthorized */}
            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />

            {/* Catch All */}
            <Route path="*" element={<Home />} />

        </Routes>
        
    );
};

export default AppRoutes;