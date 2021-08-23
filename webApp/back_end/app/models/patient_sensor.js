// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const doctorSchema = new Schema({
    patient: {type: String, default: ''},
    sensor: {type: mongoose.Types._ObjectId, default: ''}
}, {versionKey: false});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('PatientSensor', doctorSchema, 'patient_sensors');
