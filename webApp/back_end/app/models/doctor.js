// Importing all required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our doctor schema
const doctorSchema = new Schema({
    _id: {type: String, default: '', required: true}, // This is the Tax Code
    role: {type: String, default: ''},
    notice: {type: String, enum: ['DEFAULT', 'E-MAIL', 'SMS'], default: ''}
}, {versionKey: false});

// Expose our doctor model
exports = module.exports = mongoose.model('Doctor', doctorSchema, 'doctors');
