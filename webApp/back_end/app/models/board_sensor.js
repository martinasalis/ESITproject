// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const boardSensorSchema = new Schema({
    _id: {type: String, default: ''},   // Board MAC address
    sensor: {type: String, default: ''},
    threshold: {type: Number, default: 0.0}
}, {versionKey: false});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('BoardSensor', boardSensorSchema, 'board_sensors');
