import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../api/eventService";
import { formatDateTime, formatPrice } from "../utils/eventFormatters";
import "../styles/events.css";

const getErrorMessage = (error) => {
    if (error.response?.status === 404) return "The event could not be found.";

    return error.response?.data?.error
        || error.response?.data?.message
        || "We could not load this event right now. Please try again later.";
};

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadEvent = async () => {
            if (!eventId) {
                setError("No event was selected.");
                setLoading(false);
                return;
            }

            try {
                const data = await getEventById(eventId);

                if (isMounted) {
                    if (data && typeof data === "object") setEvent(data);
                    else setError("The event could not be found.");
                }
            } catch (requestError) {
                if (isMounted) setError(getErrorMessage(requestError));
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadEvent();

        return () => {
            isMounted = false;
        };
    }, [eventId]);

    return (
        <main className="events-page">
            <div className="container py-5">
                <Link className="event-back-link d-inline-block mb-4" to="/events">
                     ← Back to Events
                </Link>

                {loading && (
                    <div className="events-state" role="status">
                        <div className="spinner-border" aria-hidden="true" />
                        <p>Loading event details...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="alert alert-danger events-alert" role="alert">
                        <h1 className="h4">Event unavailable</h1>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && event && (
                    <article className="event-details-card card border-0 shadow">
                        <div className="card-body p-4 p-md-5">
                            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                                <span className="event-sport">{event.sport || "Sports"}</span>
                                <span className={`event-status event-status-${(event.status || "unknown").toLowerCase()}`}>
                                    {event.status || "Status unavailable"}
                                </span>
                            </div>

                            <h1 className="event-details-title">{event.title || "Untitled event"}</h1>
                            <p className="event-details-description">
                                {event.description || "No description is available."}
                            </p>

                            <div className="event-details-grid">
                                <div><span>Location</span><strong>{event.location || "To be announced"}</strong></div>
                                <div><span>Start</span><strong>{formatDateTime(event.startDate)}</strong></div>
                                <div><span>End</span><strong>{event.endDate ? formatDateTime(event.endDate) : "Not specified"}</strong></div>
                                <div><span>Price</span><strong>{formatPrice(event.price)}</strong></div>
                                <div><span>Available tickets</span><strong>{Number.isFinite(Number(event.availableTickets)) ? event.availableTickets : "Unavailable"}</strong></div>
                                <div><span>Created</span><strong>{event.createdAt ? formatDateTime(event.createdAt) : "Not provided"}</strong></div>
                                <div><span>Last updated</span><strong>{event.updatedAt ? formatDateTime(event.updatedAt) : "Not provided"}</strong></div>
                            </div>
                        </div>
                    </article>
                )}
            </div>
        </main>
    );
};

export default EventDetails;
