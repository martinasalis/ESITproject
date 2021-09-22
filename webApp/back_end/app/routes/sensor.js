const Sensor = require('../models/sensor');
const Patient = require("../models/patient");
const AWS = require("aws-sdk");

exports = module.exports = function(app) {

    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.update({region: 'us-east-2'});
    const docClient = new AWS.DynamoDB.DocumentClient();

    function patient_threshold_db(sensors, board, pat_doctor, pat_id) {
        // This function inset or update if exist a item in patient_threshold table of DynamoDB
        let data = [];

        sensors.forEach((sensor) => {
            let sensor_data = {};
            sensor_data['type'] = sensor.type;
            sensor_data['threshold'] = sensor.threshold;
            sensor_data['um'] = sensor.um;
            data.push(sensor_data);
        });

        const params = {
            Item: {
                "mac_address": board,
                "doctor_id": pat_doctor,
                "patient_id": pat_id,
                "data": data
            },
            ReturnConsumedCapacity: "TOTAL",
            "TableName": "patient_threshold"
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

    app.post('/insertSensorBoard', function(req, res) {
        // Insert a new sensor in patient's board
        Sensor.updateOne({_id: req.body._id}, {board: req.body.board, threshold: req.body.threshold}, function(err, snr) {
            // Error
            if(err)
                res.send(err);
            else {
                Patient.findOne({board: req.body.board}, function(err, pat) {
                    // If there is an error retrieving, send the error.
                    if(err)
                        res.send(err);
                    else {
                        Sensor.find({board: req.body.board}, function(error, sensors) {
                            patient_threshold_db(sensors, req.body.board, pat.doctor, pat._id);
                        });
                    }
                });
                res.json(snr);
            }
        });
    });

    app.post('/deleteAllSensorBoard', function(req, res) {

        const params = {
            TableName: "patient_threshold",
            Key: {
                mac_address: req.body.board,
                doctor_id: req.body.doctor
            }
        };

        docClient.delete(params, function(err, data){
            if(err){
                console.log(err);
            }
            else {
                console.log(data);
            }
        });

        // Delete all sensor of patient's board
        Sensor.deleteMany({board: req.body.board}, function(err, snr) {
            // Error
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/getAllSensorBoard', function(req, res) {
        // Get all sensors of a specific board
        Sensor.find({board: req.body.board}, function(err, snr) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/getUnitMeasure', function(req, res) {
        // Get unit measure of a sensor
        Sensor.findOne({type: req.body.type}, function(err, snr) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(snr.um);
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

    app.post('/allFreeSensors', function(req, res) {
        // Get all sensors
        Sensor.find({board: ''}, function(err, snr) {
            // Error
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/updateSensor', function(req, res) {
        // Update sensor data
        Sensor.updateOne({_id: req.body._id}, {name: req.body.info.name, um: req.body.info.um, threshold: req.body.info.threshold}, function(err, snr) {
            if(err) // Error
                res.send(err);
            else {
                Patient.findOne({board: req.body.board}, function(err, pat) {
                    // If there is an error retrieving, send the error.
                    if(err)
                        res.send(err);
                    else {
                        console.log(pat);
                        if(pat != null) {
                            Sensor.find({board: req.body.board}, function (error, sensors) {
                                patient_threshold_db(sensors, req.body.board, pat.doctor, pat._id);
                            });
                        }
                    }
                });
                res.json(snr);
            }
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
        Sensor.insertMany([{name: req.body.name, um: req.body.um, threshold: req.body.threshold, board: req.body.board, type: req.body.type}], function(err, snr) {
            // Error
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/searchSensors', function(req, res) {
        let param = req.body.param;

        // Get a sensor that match with param
        Sensor.find({name: {$regex: param, $options: 'i'}},
            function(err, snr) {
                // Error
                if(err)
                    res.send(err);

                res.json(snr);
            });
    });

};
