import { useState, useEffect } from "react";
import authService from "../api/authService";
import "../styles/profile.css";

const Profile = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await authService.getProfile();

                setFormData({
                    username: user.username,
                    email: user.email,
                    password: ""
                });
            } catch (err) {
                console.error(err);
                setError("Unable to load profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const updateData = {
                username: formData.username,
                email: formData.email
            };

            if (formData.password.trim() !== "") {
                updateData.password = formData.password;
            }

            const result = await authService.updateProfile(updateData);

            setMessage(result.message || "Profile updated successfully!");

            setFormData((prev) => ({
                ...prev,
                password: ""
            }));
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message || "Failed to update profile."
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="auth-card">

                <h2 className="text-center mb-4">
                    My Profile
                </h2>

                {message && (
                    <div className="alert alert-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            New Password (Optional)
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep your current password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Update Profile
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Profile;