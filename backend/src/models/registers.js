const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    },
    is_admin: {
        type: Number, default: false,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
RegistrationSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString(), is_admin: this.is_admin }, process.env.SECRET_KEY);
        console.log(token);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send("Token generation Error" + error);
        console.log(error);
    }
}

RegistrationSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // const passwordHash = await bcrypt.hash(password, 10);
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    }
    next();
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