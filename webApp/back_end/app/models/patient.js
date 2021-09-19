// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const patientSchema = new Schema({
    _id: {type: String, default: '', required: true},   //This is the Tax Code
    address: {type: String, default: ''},
    dor: {type: Date, default: Date.now},
    doctor: {type: String, default: ''},
    board: {type: String, default: ''},
    description: {type: String, default: ''}
}, {versionKey: false});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('Patient', patientSchema, 'patients');
