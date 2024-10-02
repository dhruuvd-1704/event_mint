const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // Assuming userId references a User document
        ref: 'User', // Referencing the User model
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId, // Assuming eventId references an Event document
        ref: 'Event', // Referencing the Event model
        required: true
    },
    ticketDetails: {
        eventName: {
            type: String,
            required: true
        },
        eventLocation: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    bookingDate: {
        type: Date,
        default: Date.now // Automatically set the booking date to current time
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
