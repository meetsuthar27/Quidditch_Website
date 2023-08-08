const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    match: {
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        required: true
    },
    seatRegion: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
