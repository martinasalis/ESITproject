// grab the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our user schema
const userSchema = new Schema({
    nome: {type: String, default: ''},
    cognome : {type: String, default: ''},
    cf: {type: String, default: ''},
    username: {type: String, default: ''},
    password: {type: String, default: ''}
});

// module.exports allows us to pass this to other files when it is called
exports = module.exports = mongoose.model('User', userSchema);
