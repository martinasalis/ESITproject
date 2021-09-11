// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const doctorSchema = new Schema({
    mac: {type: String, default: ''},
    patient: {type: String, default: ''}
}, {versionKey: false});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('Board', doctorSchema, 'boards');
