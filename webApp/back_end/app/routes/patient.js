const Patient = require('../models/patient')

exports = module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.post('/info', function(req, res) {
        // use mongoose to check if username and password is true or not
        Patient.findOne({_id: req.body._id}, function(err, pat) {

            // If there is an error retrieving, send the error.
            // Nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(pat); // return response
        });
    });

    app.post('/patients', function(req, res) {

        // Get all patients of a doctor
        Patient.find({doctor: req.body.doctor}, function(err, pats) {

            // Send the error occurred
            if(err)
                res.send(err);

            // Send the patients of a doctor (from 0 to N)
            res.json(pats);
        });
    });

    app.post('/infoPatient', function(req, res) {

        // Get all info of a specific patient of a doctor
        Patient.findOne({_id: req.body._id}, function(err, pat) {

            // Send error occurred
            if(err)
                res.send(err);

            // Send patient info
            res.json(pat);
        });
    });

};
