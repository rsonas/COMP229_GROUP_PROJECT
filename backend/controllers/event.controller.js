import Event from '../models/Event.js';
import extend from 'lodash/extend.js';

// Create a new event
const create = async (req, res) => {
    const event = new Event(req.body);

    try {
        await event.save();

        return res.status(200).json({
            message: 'Event created successfully',
            data: event
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// List all events
const list = async (req, res) => {
    try {
        const events = await Event.find();

        return res.status(200).json(events);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// Find an event by ID
const eventByID = async (req, res, next, id) => {
    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(400).json({
                error: 'Event not found'
            });
        }

        req.event = event;
        next();
    } catch (err) {
        return res.status(400).json({
            error: 'Could not retrieve event'
        });
    }
};

// Read one event
const read = (req, res) => {
    return res.status(200).json(req.event);
};

// Update an event
const update = async (req, res) => {
    try {
        let event = req.event;

        event = extend(event, req.body);
        event.updated = Date.now();

        await event.save();

        return res.status(200).json({
            message: 'Event updated successfully',
            data: event
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// Disable/cancel an event instead of deleting it permanently
const remove = async (req, res) => {
    try {
        const event = req.event;

        event.status = 'Cancelled';
        event.updated = Date.now();

        await event.save();

        return res.status(200).json({
            message: 'Event cancelled successfully',
            data: event
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

export default {
    create,
    list,
    eventByID,
    read,
    update,
    remove
};