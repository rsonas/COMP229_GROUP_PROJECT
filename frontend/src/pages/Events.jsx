import { useEffect, useState } from "react";
import { getEvents } from "../api/eventService";
import EventCard from "../components/EventCard";
import "../styles/events.css";

const getErrorMessage = (error) => (
    error.response?.data?.error
    || error.response?.data?.message
    || "We could not load events right now. Please try again later."
);

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadEvents = async () => {
            try {
                const data = await getEvents();

                if (isMounted) {
                    setEvents(Array.isArray(data) ? data : []);
                }
            } catch (requestError) {
                if (isMounted) setError(getErrorMessage(requestError));
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadEvents();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <main className="events-page">
            <div className="container py-5">
                <header className="events-header text-center mx-auto mb-5">
                    <p className="events-eyebrow mb-2">Find your next game</p>
                    <h1 className="events-title mb-3">Sports Events</h1>
                    <p>Browse upcoming sports experiences no account required.</p>
                </header>

                {loading && (
                    <div className="events-state" role="status">
                        <div className="spinner-border" aria-hidden="true" />
                        <p>Loading events...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="alert alert-danger events-alert" role="alert">
                        <h2 className="h5">Unable to load events</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className="events-state">
                        <h2 className="h4">No events available</h2>
                        <p>Check back soon for new sports events.</p>
                    </div>
                )}

                {!loading && !error && events.length > 0 && (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Events;

