// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const boardSensorSchema = new Schema({
    board: {type: String, default: ''},
    sensor: {type: String, default: ''}
}, {versionKey: false});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('BoardSensor', boardSensorSchema, 'board_sensors');
