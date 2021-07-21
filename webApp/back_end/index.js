// modules =================================================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(cors());

// configuration ===========================================

// config files
const db = require('./config/db');
mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});

// set our port
const port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// routes ==================================================
require('./app/routes/user')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

// expose app
exports = module.exports = app;
