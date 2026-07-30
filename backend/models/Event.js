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
    }

}, {
    timestamps: true
});


export default mongoose.model('Event', eventSchema);