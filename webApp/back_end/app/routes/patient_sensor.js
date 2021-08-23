const PatientSensor = require('../models/patient_sensor')

exports = module.exports = function(app) {

    // server routes ===========================================================

    app.post('/patientSensors', function(req, res) {
        // Get all sensors of a patient
        PatientSensor.find({patient: req.body.patient}, function(err, snr) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/appPatientSensors', function(req, res) {
        // Get all data
        PatientSensor.find({}, function(err, snr) {
            // Error
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

};
