// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const userSchema = new Schema({
    _id: {type: String, default: '', required: true}, // This is the Tax Code
    name: {type: String, default: ''},
    surname : {type: String, default: ''},
    username: {type: String, default: ''},
    password: {type: String, default: ''},
    type: {type: String, enum: ['DEFAULT', 'DOCTOR', 'PATIENT', 'ADMIN'], default: 'DEFAULT'}
}, {versionKey: false});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('User', userSchema);
