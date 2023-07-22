const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    c1name: {
        type: String,
        required: true
    },
    c1number: {
        type: String,
        required: true
    },
    c1age: {
        type: Number,
        required: true
    },
    c2name: {
        type: String,
        required: true
    },
    c2number: {
        type: String,
        required: true
    },
    c2age: {
        type: Number,
        required: true
    },
    c3name: {
        type: String,
        required: true
    },
    c3number: {
        type: String,
        required: true
    },
    c3age: {
        type: Number,
        required: true
    }
})

const Register = new mongoose.model("Register", RegistrationSchema);
const TestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
})

console.log("s")

module.exports = Register;