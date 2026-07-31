import api from "./axios";

const getEvents = async () => {
    const response = await api.get("/api/events");
    return response.data;
};

const getEventById = async (eventId) => {
    const response = await api.get(`/api/events/${eventId}`);
    return response.data;
};

// Create a new event
const createEvent = async (eventData) => {
    const response = await api.post("/api/events", eventData);
    return response.data;
};

// Update an existing event
const updateEvent = async (eventId, eventData) => {
    const response = await api.put(
        `/api/events/${eventId}`,
        eventData
    );

    return response.data;
};

// Cancel an event
const cancelEvent = async (eventId) => {
    const response = await api.delete(`/api/events/${eventId}`);
    return response.data;
};

export {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    cancelEvent
};