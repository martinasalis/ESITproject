// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const doctorSchema = new Schema({
    _id: {type: String, default: '', required: true}, // This is the Tax Code
    mail: {type: String, default: ''},
    phone: {type: String, default: ''},
    dob: {type: Date, default: Date.now},
    role: {type: String, enum: ['DOCTOR', 'PATIENT', 'ADMIN'], default: ''}
});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('Doctor', doctorSchema);
