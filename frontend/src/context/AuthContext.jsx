import { createContext, useEffect, useState } from "react";
import authService from "../api/authService";

// Create authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load the logged-in user when the application starts
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const profile = await authService.getProfile();
                setUser(profile);
            } catch (error) {
                console.error("Failed to load user:", error);

                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Login user
    const login = async (credentials) => {
        try {
            await authService.login(credentials);

            const profile = await authService.getProfile();

            setUser(profile);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Unable to login. Please try again.",
            };
        }
    };

    // Register new user
    const register = async (userData) => {
        try {
            const response = await authService.register(userData);

            return {
                success: true,
                data: response,
            };
        } catch (error) {
            console.error("Registration error:", error.response?.data);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Registration failed."
            };
        }
    };

    // Logout user
    const logout = () => {
        authService.logout();
        setUser(null);

        window.location.href = "/";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };