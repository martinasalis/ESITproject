const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Define sensor schema
const sensorSchema = new Schema({
    //_id: {type: Number, default: 0},
    name: {type: String, default: ''},
    um: {type: String, default: ''}    //  Unit of measure
}, {versionKey: false});

//sensorSchema.plugin(AutoIncrement);

exports = module.exports = mongoose.model('Sensor', sensorSchema, 'sensors');
