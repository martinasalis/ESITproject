// modules =================================================
const express = require('express');
const cors = require('cors');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// configuration ===========================================

// config files
const db = require('./config/db');

// set our port
const port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

// expose app
exports = module.exports = app;
