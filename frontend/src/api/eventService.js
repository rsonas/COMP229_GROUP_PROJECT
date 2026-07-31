import api from "./axios";

const getEvents = async () => {
    const response = await api.get("/api/events");
    return response.data;
};

const getEventById = async (eventId) => {
    const response = await api.get(`/api/events/${eventId}`);
    return response.data;
};

export { getEvents, getEventById };

