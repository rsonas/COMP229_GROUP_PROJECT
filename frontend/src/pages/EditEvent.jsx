import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getEventById,
    updateEvent
} from "../api/eventService";

import useAuth from "../context/useAuth";
import "../styles/events.css";

const formatDateForInput = (value) => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const pad = (number) => String(number).padStart(2, "0");

    return (
        `${date.getFullYear()}-` +
        `${pad(date.getMonth() + 1)}-` +
        `${pad(date.getDate())}T` +
        `${pad(date.getHours())}:` +
        `${pad(date.getMinutes())}`
    );
};

const EditEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

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

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadEvent = async () => {
            try {
                const event = await getEventById(eventId);

                const ownerId =
                    typeof event.owner === "object"
                        ? event.owner?._id
                        : event.owner;

                if (!user || ownerId !== user._id) {
                    if (isMounted) {
                        setError(
                            "You can only edit events that you created."
                        );
                    }

                    return;
                }

                if (isMounted) {
                    setFormData({
                        title: event.title || "",
                        sport: event.sport || "",
                        description: event.description || "",
                        location: event.location || "",
                        startDate: formatDateForInput(
                            event.startDate
                        ),
                        endDate: formatDateForInput(
                            event.endDate
                        ),
                        price: event.price ?? "",
                        availableTickets:
                            event.availableTickets ?? ""
                    });
                }
            } catch (requestError) {
                if (isMounted) {
                    setError(
                        requestError.response?.data?.error
                        || requestError.response?.data?.message
                        || "Unable to load the event."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadEvent();

        return () => {
            isMounted = false;
        };
    }, [eventId, user]);

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
            endDate: formData.endDate || null,
            price: Number(formData.price),
            availableTickets: Number(
                formData.availableTickets
            )
        };

        try {
            await updateEvent(eventId, eventData);

            navigate(`/events/${eventId}`);
        } catch (requestError) {
            const details =
                requestError.response?.data?.details;

            setError(
                Array.isArray(details)
                    ? details.join(", ")
                    : requestError.response?.data?.error
                    || requestError.response?.data?.message
                    || "Unable to update the event."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="events-page">
                <div
                    className="events-state"
                    role="status"
                >
                    <div
                        className="spinner-border"
                        aria-hidden="true"
                    />

                    <p>Loading event...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="events-page">
            <div className="container py-5">
                <Link
                    className="event-back-link d-inline-block mb-4"
                    to={`/events/${eventId}`}
                >
                    ← Back to Event
                </Link>

                <div className="event-details-card card border-0 shadow">
                    <div className="card-body p-4 p-md-5">
                        <h1 className="event-details-title">
                            Edit Event
                        </h1>

                        <p className="event-details-description">
                            Update your sports event information.
                        </p>

                        {error && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}

                        {!error && (
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
                                            value={
                                                formData.availableTickets
                                            }
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
                                        ? "Saving Changes..."
                                        : "Save Changes"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditEvent;