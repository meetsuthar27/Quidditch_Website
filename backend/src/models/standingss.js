const mongoose = require('mongoose');

const standingSchema = new mongoose.Schema({
    team: {
        type: String,
        ref: 'Register', // Referencing the Register model
        required: true
    },
    matches: {
        type: Number,
        default: 0
    },
    win: {
        type: Number,
        default: 0
    },
    loss: {
        type: Number,
        default: 0
    },
    draw: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    gd: {
        type: Number,
        default: 0
    }
});

const Standing = new mongoose.model('Standing', standingSchema);

module.exports = Standing;
