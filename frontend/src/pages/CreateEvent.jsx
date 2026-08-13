/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Create event page - allows an authenticated user to make a new event

*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createEvent } from "../api/eventService";
import "../styles/events.css";

const CreateEvent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        sport: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        price: "",
        availableTickets: ""
    });

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSubmitting(true);

        const eventData = {
            title: formData.title.trim(),
            sport: formData.sport.trim(),
            description: formData.description.trim(),
            location: formData.location.trim(),
            startDate: formData.startDate,
            price: Number(formData.price),
            availableTickets: Number(formData.availableTickets)
        };

        if (formData.endDate) {
            eventData.endDate = formData.endDate;
        }

        try {
            const result = await createEvent(eventData);

            navigate(`/events/${result.data._id}`);
        } catch (requestError) {
            const details = requestError.response?.data?.details;

            setError(
                Array.isArray(details)
                    ? details.join(", ")
                    : requestError.response?.data?.error
                    || requestError.response?.data?.message
                    || "Unable to create the event."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="events-page">
            <div className="container py-5">
                <Link
                    className="event-back-link d-inline-block mb-4"
                    to="/events"
                >
                    ← Back to Events
                </Link>

                <div className="event-details-card card border-0 shadow">
                    <div className="card-body p-4 p-md-5">
                        <h1 className="event-details-title">
                            Create Event
                        </h1>

                        <p className="event-details-description">
                            Enter the information for the new sports event.
                        </p>

                        {error && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="title"
                                >
                                    Event Title
                                </label>

                                <input
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="sport"
                                >
                                    Sport
                                </label>

                                <input
                                    id="sport"
                                    type="text"
                                    className="form-control"
                                    name="sport"
                                    value={formData.sport}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="description"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    className="form-control"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="location"
                                >
                                    Location
                                </label>

                                <input
                                    id="location"
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="startDate"
                                    >
                                        Start Date
                                    </label>

                                    <input
                                        id="startDate"
                                        type="datetime-local"
                                        className="form-control"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="endDate"
                                    >
                                        End Date
                                    </label>

                                    <input
                                        id="endDate"
                                        type="datetime-local"
                                        className="form-control"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label
                                        className="form-label"
                                        htmlFor="price"
                                    >
                                        Price
                                    </label>

                                    <input
                                        id="price"
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label
                                        className="form-label"
                                        htmlFor="availableTickets"
                                    >
                                        Available Tickets
                                    </label>

                                    <input
                                        id="availableTickets"
                                        type="number"
                                        className="form-control"
                                        name="availableTickets"
                                        min="0"
                                        step="1"
                                        value={formData.availableTickets}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn event-button"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Creating Event..."
                                    : "Create Event"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateEvent;