/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Defines structure for events stored in MongoDB

*/

import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    sport: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: false
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    availableTickets: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: [
            'Active',
            'Full',
            'Completed',
            'Cancelled',
            'Expired'
        ],
        default: 'Active'
    },

    // Stores the user who created this event
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    history : [
        {
            username: {
                type: String,
                requires: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            comment: {
                type: String,
                required: true
     
           }   
        }
    ]

}, {
    timestamps: true
});


export default mongoose.model('Event', eventSchema);