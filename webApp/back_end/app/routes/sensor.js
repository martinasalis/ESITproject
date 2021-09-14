const Sensor = require('../models/sensor');
const db = require("../../config/db");
const AWS = require("aws-sdk");

exports = module.exports = function(app) {

    AWS.config.update(db.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();

    // server routes ===========================================================

    app.post('/infoSensor', function(req, res) {
        // Get info of a sensor
        Sensor.findOne({_id: req.body._id}, function(err, snr) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/allSensors', function(req, res) {
        // Get all sensors
        Sensor.find({}, function(err, snr) {
            // Error
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/updateSensor', function(req, res) {
        // Update sensor data
        Sensor.updateOne({_id: req.body._id},
            {_id: req.body.info._id, name: req.body.info.name, um: req.body.info.um, min_threshold: req.body.info.min_threshold, max_threshold: req.body.max_threshold},
            function(err, snr) {
            if(err) // Error
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/deleteSensor', function(req, res) {
        // Delete a sensor
        Sensor.deleteOne({_id: req.body._id}, function(err, snr) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(snr.ok);
        });
    });

    app.post('/insertSensor', function(req, res) {
        // Insert a new sensor
        Sensor.insertMany([{name: req.body.name, um: req.body.um, min_threshold: req.body.info.min_threshold, max_threshold: req.body.max_threshold}], function(err, snr) {
            // Error
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/boardSensorData', function(req, res) {

        console.log(req.body);

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


        docClient.query(params, function(err, data){
            if(err){
                res.send(err);
            }
            else{
                res.send(data);

                data.Items.forEach(function(element, index, array) {
                    console.log(element.device_data);
                });
            }
        });
    });

};
