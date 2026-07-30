import Event from '../models/Event.js';
import extend from 'lodash/extend.js';


// Create a new event
const create = async (req, res) => {

    const event = new Event({
        ...req.body,
        owner: req.user.id
    });


    // Validate event dates
    if (event.endDate && event.endDate < event.startDate) {

        return res.status(400).json({
            error: 'End date cannot be before start date'
        });

    }


    try {

        await event.save();

        return res.status(201).json({
            message: 'Event created successfully',
            data: event
        });


    } catch (err) {

        return res.status(400).json({
            error: err.message
        });

    }

};



// List all events (Public access)
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



// Find event by ID
const eventByID = async (req, res, next, id) => {

    try {

        const event = await Event.findById(id);


        if (!event) {

            return res.status(404).json({
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



// Update event
// Only the owner can update their event
const update = async (req, res) => {

    try {

        let event = req.event;


        // Check ownership
        if (!event.owner || event.owner.toString() !== req.user.id) {

            return res.status(403).json({
                error: 'You can only update your own events'
            });

        }


        event = extend(event, req.body);



        // Validate updated dates
        if (event.endDate && event.endDate < event.startDate) {

            return res.status(400).json({
                error: 'End date cannot be before start date'
            });

        }


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



// Cancel event instead of deleting
// Only the owner can cancel their event
const remove = async (req, res) => {

    try {

        const event = req.event;


        // Check ownership
        if (!event.owner || event.owner.toString() !== req.user.id) {

            return res.status(403).json({

                error: 'You can only cancel your own events'

            });

        }



        // Change status instead of deleting
        event.status = 'Cancelled';



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