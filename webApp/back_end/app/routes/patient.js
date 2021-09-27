// Import all required modules and patient model
const Patient = require('../models/patient');
const AWS = require("aws-sdk");

exports = module.exports = function(app) {

    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.update({region: 'us-east-2'});
    const docClient = new AWS.DynamoDB.DocumentClient();

    // server routes ===========================================================

    app.post('/infoPatient', function(req, res) {
        // Get patient info
        Patient.findOne({_id: req.body._id}, function(err, pat) {
            if (err)
                res.send(err);  // Error
            else
                res.json(pat);
        });
    });

    app.post('/insertPatientBoard', function(req, res) {
        // Associated a board to a patient
        Patient.updateOne({_id: req.body.patient._id}, {board: req.body.board}, function(err, pat) {
            if(err)
                res.send(err);  // Error occurred
            else
                res.json(pat);
        });
    });

    app.post('/doctorPatients', function(req, res) {
        // Get all patients of a doctor
        Patient.find({doctor: req.body.doctor}, function(err, pats) {
            if(err)
                res.send(err);  // Send the error occurred
            else
                res.json(pats); // Send the patients of a doctor (from 0 to N)
        });
    });

    app.post('/allPatients', function(req, res) {
        // Get all patients
        Patient.find({}, function(err, pats) {
            if(err)
                res.send(err);  // Error occurred
            else
                res.json(pats);
        });
    });

    app.post('/allFreePatients', function(req, res) {
        // Get all patients with no board associate
        Patient.find({board: ''}, function(err, pats) {
            if(err)
                res.send(err);  // Error occurred
            else
                res.json(pats);
        });
    });

    app.post('/updatePatient', function(req, res) {
        let updateData = req.body.info;

        // Update a specific patient
        Patient.updateOne({_id: req.body._id}, {_id: updateData._id, address: updateData.address, dor: updateData.dor, doctor: updateData.doctor, board: updateData.board, description: updateData.description}, function (err, pat) {
            if(err)
                res.send(err);  // Error in update patient
            else
                res.json(pat.ok);
        });
    });

    app.post('/deletePatient', function(req, res) {
        // Delete a specific patient
        Patient.deleteOne({_id: req.body._id}, function(err, pat) {
            if(err)
                res.send(err);  // Error occurred
            else
                res.json(pat.ok);
        });
    });

    app.post('/insertPatient', function(req, res) {
        // Insert a new patient
        Patient.insertMany([{_id: req.body._id, address: req.body.address, dor: req.body.dor, doctor: req.body.doctor, board: req.body.board, description: req.body.description}], function(err, user) {
            if(err)
                res.send(err);  // Error
            else
                res.json(user);
        });
    });

    app.post('/boardSensorData', function(req, res) {

        const params = {
            "TableName": "health_data",
            "KeyConditionExpression": "#DYNOBASE_mac_address = :pkey",
            "ExpressionAttributeValues": {
                ":pkey": req.body.board
            },
            "ExpressionAttributeNames": {
                "#DYNOBASE_mac_address": "mac_address"
            },
            "ScanIndexForward": true
        };

        // Get the data collected by the sensors associated to a board and stored in DynamoDB
        docClient.query(params, function(err, data){
            if(err)
                res.send(err);
            else
                res.send(data);
        });
    });

};
