// modules =================================================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/db');

app.use(cors());

// configuration ===========================================

// config files
// connect to our mongoDB database
mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});

// set our port
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;

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
