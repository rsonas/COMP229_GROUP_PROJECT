/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Provides functions to create, update, fetch, and cancel events on backend

*/

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