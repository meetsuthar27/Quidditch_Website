const mongoose = require('mongoose');

const clashesSchema = new mongoose.Schema({
    team1: {
        type: String,
        ref: 'Register', // Referencing the Register model
        required: true
    },
    team2: {
        type: String,
        ref: 'Register', // Referencing the Register model
        required: true
    },
    Date: {
        type: String,
        default: 0
    },
    g1: {
        type: Number,
        default: 0
    },
    g2: {
        type: Number,
        default: 0
    },
    venue: {
        type: String,
        default: "Ahmedabad"
    }
});

const Clashess = new mongoose.model('Clashess', clashesSchema);

module.exports = Clashess;
