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

    location: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true
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
        enum: ['Open', 'Full', 'Completed', 'Cancelled'],
        default: 'Open'
    }

}, {
    timestamps: true
});

export default mongoose.model('Event', eventSchema);