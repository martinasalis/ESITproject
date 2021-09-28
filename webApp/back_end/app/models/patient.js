// Import all required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our patient schema
const patientSchema = new Schema({
    _id: {type: String, default: '', required: true},   //This is the Tax Code
    address: {type: String, default: ''},
    dor: {type: Date, default: Date.now},
    doctor: {type: String, default: ''},
    board: {type: String, default: ''},
    description: {type: String, default: ''}
}, {versionKey: false});

// Expose our patient schema
exports = module.exports = mongoose.model('Patient', patientSchema, 'patients');
