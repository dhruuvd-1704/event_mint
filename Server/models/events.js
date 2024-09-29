const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    eventName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventType: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eventDescription: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
