// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our user schema
const userSchema = new Schema({
    _id: {type: String, default: '', required: true}, // This is the Tax Code
    name: {type: String, default: ''},
    surname : {type: String, default: ''},
    username: {type: String, default: ''},
    password: {type: String, default: ''},
    mail: {type: String, default: ''},
    phone: {type: String, default: ''},
    dob: {type: Date, default: Date.now},
    type: {type: String, enum: ['DEFAULT', 'DOCTOR', 'PATIENT', 'ADMIN'], default: 'DEFAULT'}
}, {versionKey: false});

// Expose our user model
exports = module.exports = mongoose.model('User', userSchema, 'users');
