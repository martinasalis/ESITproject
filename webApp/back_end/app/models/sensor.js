// Import all required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our sensor schema
const sensorSchema = new Schema({
    name: {type: String, default: ''},
    um: {type: String, default: ''},    //  Unit of measure
    threshold: {type: Number, default: 0},
    board: {type: String, default: ''},
    type: {type: Number, default: 0}
}, {versionKey: false});

// Expose our sensor model
exports = module.exports = mongoose.model('Sensor', sensorSchema, 'sensors');
