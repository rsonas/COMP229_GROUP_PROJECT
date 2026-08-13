/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Container to display individual event details

*/

import { Link } from "react-router-dom";
import { formatDateTime, formatPrice } from "../utils/eventFormatters";

const EventCard = ({ event }) => {
    const description = event.description || "No description is available.";
    const tickets = Number(event.availableTickets);

    return (
        <div className="col">
            <article className="card event-card h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column p-4">
                    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                        <span className="event-sport">{event.sport || "Sports"}</span>
                        <span className={`event-status event-status-${(event.status || "unknown").toLowerCase()}`}>
                            {event.status || "Status unavailable"}
                        </span>
                    </div>

                    <h2 className="event-card-title h4">{event.title || "Untitled event"}</h2>
                    <p className="event-description mb-4">{description}</p>

                    <dl className="event-summary mb-4">
                        <div>
                            <dt>Location</dt>
                            <dd>{event.location || "To be announced"}</dd>
                        </div>
                        <div>
                            <dt>Starts</dt>
                            <dd>{formatDateTime(event.startDate)}</dd>
                        </div>
                        <div>
                            <dt>Price</dt>
                            <dd>{formatPrice(event.price)}</dd>
                        </div>
                        <div>
                            <dt>Tickets</dt>
                            <dd>{Number.isFinite(tickets) ? tickets : "Unavailable"}</dd>
                        </div>
                    </dl>

                    <Link
                        className="btn event-button mt-auto"
                        to={`/events/${event._id}`}
                        aria-label={`View details for ${event.title || "event"}`}
                    >
                        View Details
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default EventCard;
