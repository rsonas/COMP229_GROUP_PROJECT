import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    cancelEvent,
    getEvents
} from "../api/eventService";

import useAuth from "../context/useAuth";
import {
    formatDateTime,
    formatPrice
} from "../utils/eventFormatters";

import "../styles/events.css";

const Dashboard = () => {
    const { user } = useAuth();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionError, setActionError] = useState("");
    const [cancellingId, setCancellingId] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadMyEvents = async () => {
            try {
                const data = await getEvents();
                const allEvents = Array.isArray(data) ? data : [];

                const myEvents = allEvents.filter((event) => {
                    const ownerId =
                        typeof event.owner === "object"
                            ? event.owner?._id
                            : event.owner;

                    return ownerId === user?._id;
                });

                if (isMounted) {
                    setEvents(myEvents);
                }
            } catch (requestError) {
                if (isMounted) {
                    setError(
                        requestError.response?.data?.error
                        || requestError.response?.data?.message
                        || "Unable to load your events."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (user?._id) {
            loadMyEvents();
        }

        return () => {
            isMounted = false;
        };
    }, [user?._id]);

    const handleCancel = async (eventId) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this event?"
        );

        if (!confirmed) {
            return;
        }

        setActionError("");
        setCancellingId(eventId);

        try {
            const result = await cancelEvent(eventId);

            setEvents((currentEvents) =>
                currentEvents.map((event) =>
                    event._id === eventId
                        ? result.data
                        : event
                )
            );
        } catch (requestError) {
            setActionError(
                requestError.response?.data?.error
                || requestError.response?.data?.message
                || "Unable to cancel the event."
            );
        } finally {
            setCancellingId("");
        }
    };

    return (
        <main className="events-page">
            <div className="container py-5">
                <header className="events-header text-center mx-auto mb-5">
                    <p className="events-eyebrow mb-2">
                        Manage your events
                    </p>

                    <h1 className="events-title mb-3">
                        My Dashboard
                    </h1>

                    <p>
                        Create, view, edit and manage your sports events.
                    </p>

                    <Link
                        className="btn event-button mt-3"
                        to="/events/create"
                    >
                        Create Event
                    </Link>
                </header>

                {actionError && (
                    <div
                        className="alert alert-danger events-alert"
                        role="alert"
                    >
                        {actionError}
                    </div>
                )}

                {loading && (
                    <div className="events-state" role="status">
                        <div
                            className="spinner-border"
                            aria-hidden="true"
                        />

                        <p>Loading your events...</p>
                    </div>
                )}

                {!loading && error && (
                    <div
                        className="alert alert-danger events-alert"
                        role="alert"
                    >
                        <h2 className="h5">
                            Unable to load dashboard
                        </h2>

                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className="events-state">
                        <h2 className="h4">
                            You have not created any events
                        </h2>

                        <p>
                            Create your first event to begin managing it.
                        </p>

                        <Link
                            className="btn event-button"
                            to="/events/create"
                        >
                            Create Event
                        </Link>
                    </div>
                )}

                {!loading && !error && events.length > 0 && (
                    <div className="row row-cols-1 row-cols-lg-2 g-4">
                        {events.map((event) => (
                            <div className="col" key={event._id}>
                                <article className="card event-card h-100 border-0 shadow-sm">
                                    <div className="card-body d-flex flex-column p-4">
                                        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                            <span className="event-sport">
                                                {event.sport || "Sports"}
                                            </span>

                                            <span
                                                className={
                                                    `event-status event-status-${(
                                                        event.status || "unknown"
                                                    ).toLowerCase()}`
                                                }
                                            >
                                                {event.status
                                                    || "Status unavailable"}
                                            </span>
                                        </div>

                                        <h2 className="event-card-title h4">
                                            {event.title || "Untitled event"}
                                        </h2>

                                        <p className="event-description">
                                            {event.description
                                                || "No description available."}
                                        </p>

                                        <dl className="event-summary mb-4">
                                            <div>
                                                <dt>Location</dt>
                                                <dd>
                                                    {event.location
                                                        || "To be announced"}
                                                </dd>
                                            </div>

                                            <div>
                                                <dt>Starts</dt>
                                                <dd>
                                                    {formatDateTime(
                                                        event.startDate
                                                    )}
                                                </dd>
                                            </div>

                                            <div>
                                                <dt>Price</dt>
                                                <dd>
                                                    {formatPrice(event.price)}
                                                </dd>
                                            </div>

                                            <div>
                                                <dt>Tickets</dt>
                                                <dd>
                                                    {event.availableTickets}
                                                </dd>
                                            </div>
                                        </dl>

                                        <div className="d-flex flex-wrap gap-2 mt-auto">
                                            <Link
                                                className="btn btn-outline-secondary"
                                                to={`/events/${event._id}`}
                                            >
                                                View
                                            </Link>

                                            <Link
                                                className="btn event-button"
                                                to={`/events/${event._id}/edit`}
                                            >
                                                Edit
                                            </Link>

                                            {event.status !== "Cancelled" && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleCancel(event._id)
                                                    }
                                                    disabled={
                                                        cancellingId
                                                        === event._id
                                                    }
                                                >
                                                    {cancellingId === event._id
                                                        ? "Cancelling..."
                                                        : "Cancel"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Dashboard;