const Patient = require('../models/patient')

exports = module.exports = function(app) {

    // server routes ===========================================================

    app.post('/info', function(req, res) {
        // Get patient info
        Patient.findOne({_id: req.body._id}, function(err, pat) {

            // Error
            if (err)
                res.send(err);

            res.json(pat);
        });
    });

    app.post('/doctorPatients', function(req, res) {
        // Get all patients of a doctor
        Patient.find({doctor: req.body.doctor}, function(err, pats) {

            // Send the error occurred
            if(err)
                res.send(err);

            // Send the patients of a doctor (from 0 to N)
            res.json(pats);
        });
    });

    app.post('/update', function(req, res) {
        let updateData = req.body.info;

        // Update a specific patient
        Patient.updateOne({_id: req.body._id},
            {_id: updateData._id, mail: updateData.mail, phone: updateData.phone, dob: updateData.dob, address: updateData.address, dor: updateData.dor},
            function (err, pat) {
            if(err) // Error in update patient
                res.send(err);

            res.json(pat.ok);
        });
    });

    app.post('/delete', function(req, res) {
        // Delete a specific patient
        Patient.deleteOne({_id: req.body._id}, function(err, pat) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(pat.ok);
        });
    });

    app.post('insert', function(req, res) {
        // Insert a new patient
        Patient.insertMany([{_id: req.body._id, mail: req.body.mail, phone: req.body.phone, dob: req.body.dob, address: req.body.address, dor: req.body.dor}])
            .then(res.json({ok: 1}))
            .catch(res.json({ok: 0}));
    });

};
