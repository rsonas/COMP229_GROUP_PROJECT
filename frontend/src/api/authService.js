//(register, login, logout functions)
import api from "./axios";

const register = async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
};

const login = async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);

    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
};

const getProfile = async () => {
    const response = await api.get("/api/auth/profile");
    return response.data;
};

const updateProfile = async (userData) => {
    const response = await api.put("/api/auth/profile", userData);
    return response.data;
};

export default {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
};