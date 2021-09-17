const Sensor = require('../models/sensor');

exports = module.exports = function(app) {

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

            res.json(snr);
        });
    });

    app.post('/deleteAllSensorBoard', function(req, res) {
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
        Sensor.updateOne({_id: req.body._id}, {_id: req.body.info._id, name: req.body.info.name, um: req.body.info.um}, function(err, snr) {
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

        let new_id = 0;

        // Get the number of sensors actually present in db
        Sensor.find({}, function(err, snr) {
            // Error
            if(err)
                console.log(err);

            else
                new_id = snr.length + 1; // New sensor ID
        });

        // Insert a new sensor
        Sensor.insertMany([{_id: new_id, name: req.body.name, um: req.body.um}], function(err, snr) {
            // Error
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/searchSensors', function(req, res) {
        let param = req.body.param;
        console.log(param);

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
