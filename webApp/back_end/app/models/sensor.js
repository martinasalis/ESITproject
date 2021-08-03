const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define sensor schema
const sensorSchema = new Schema({
    name: {type: String, default: ''},
    um: {type: String, default: ''},    //  Unit of measure
    threshold: {type: Number, default: 0.0}
});

exports = module.exports = mongoose.model('Sensor', sensorSchema);
