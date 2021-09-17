// modules =================================================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/db');

//const fs = require('fs');
//const path = require('path');
//require('dotenv/config');

app.use(cors());

// configuration ===========================================

// config files
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
require('./app/routes/user')(app);
require('./app/routes/doctor')(app);
require('./app/routes/patient')(app);
require('./app/routes/sensor')(app);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

// expose app
exports = module.exports = app;
