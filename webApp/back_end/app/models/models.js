// grab the mongoose module
const mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Users', {
    nome: {type: String, default: ''},
    cognome : {type: String, default: ''},
    cf: {type: String, default: ''},
    username: {type: String, default: ''},
    password: {type: String, default: ''}
});
