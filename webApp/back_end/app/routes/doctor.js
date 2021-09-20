const Doctor = require('../models/doctor');
const User = require("../models/user");
const AWS = require("aws-sdk");

exports = module.exports = function(app) {

    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.update({region: 'us-east-2'});
    const docClient = new AWS.DynamoDB.DocumentClient();

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

    app.post('/updateNotice', function(req, res) {

        User.findOne({_id: req.body._id}, function(err, user) {
            // If there is an error retrieving, send the error.
            if(err)
                res.send(err);
            else {
                const params = {
                    Item: {
                        "doctor_id": req.body._id,
                        "data": {
                            "notice_type": req.body.notice,
                            "mail": user.mail,
                            "phone": user.phone
                        }
                    },
                    ReturnConsumedCapacity: "TOTAL",
                    "TableName": "doctor_notice"
                };

                docClient.put(params, function(err, data){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(data);
                    }
                });
            }
        });

        // Update doctor notice choice
        Doctor.updateOne({_id: req.body._id}, {notice: req.body.notice}, function(err, doc) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(doc.ok);
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
        Doctor.updateOne({_id: req.body._id}, {_id: updateData._id, role: updateData.role, notice: updateData.notice}, function(err, doc) {
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

        User.findOne({_id: req.body._id}, function(err, user) {
            // If there is an error retrieving, send the error.
            if(err)
                res.send(err);
            else {
                const params = {
                    Item: {
                        "doctor_id": req.body._id,
                        "data": {
                            "notice_type": req.body.notice,
                            "mail": user.mail,
                            "phone": user.phone
                        }
                    },
                    ReturnConsumedCapacity: "TOTAL",
                    "TableName": "doctor_notice"
                };

                docClient.put(params, function(err, data){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(data);
                    }
                });
            }
        });

        // Insert a new doctor
        Doctor.insertMany([{_id: req.body._id, role: req.body.role, notice: req.body.notice}], function(err, doc) {
            // Error
            if(err)
                res.send(err);

            res.json(doc);
        });
    });

};
