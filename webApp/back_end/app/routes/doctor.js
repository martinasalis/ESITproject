const Doctor = require('../models/doctor')

exports = module.exports = function(app) {

    // server routes ===========================================================

    app.post('/infoDoctor', function(req, res) {
        // Get info of a specific doctor
        Doctor.findOne({_id: req.body._id}, function(err, doc) {

            // If there is an error retrieving, send the error.
            if(err)
                res.send(err);

            res.json(doc); // Return response
        });
    });

    // Get all doctors
    app.post('/allDoctors', function(req, res) {
        // Get all doctors data
        Doctor.find({}, function(err, docs) {
            // Error
            if(err)
                res.send(err);

            res.json(docs);
        });
    });

    // Update doctor info
    app.post('/updateDoctor', function(req, res) {
        let updateData = req.body.info;

        // Update info of a specific doctor
        Doctor.updateOne({_id: req.body._id},
            {_id: updateData._id, mail: updateData.mail, phone: updateData.mail, dob: updateData.dob, role: updateData.role},
            function(err, doc) {
            if(err) // Error occurred in update
                res.send(err);

            res.json(doc.ok);
        });
    });

    // Delete a doctor
    app.post('/deleteDoctor', function (req, res) {
        // Delete a specific doctor
        Doctor.deleteOne({_id: req.body._id}, function (err, doc) {
            // Error occurred in delete
            if(err)
                res.send(err);

            res.json(doc.ok);
        });
    });

    app.post('/insertDoctor', function (req, res) {
        // Insert a new doctor
        Doctor.insertMany([{_id: req.body._id, mail: req.body.mail, phone: req.body.phone, dob: req.body.dob, role: req.body.role}])
            .then(res.json({ok: 1}))
            .catch(res.json({ok: 0}));
    });

};
