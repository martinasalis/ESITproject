const Sensor = require('../models/sensor');
const db = require("./config/db");
const params = {
    TableName : db.aws_table_name
};

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

    app.post('/dynamoData', function (req, res){

        exports = module.exports = function(docClient){

            docClient.scan(params, function (err, data){
                if(err){
                    console.log(err);
                }
                else{
                    const {Items} = data;
                    console.log(Items);
                }
            });
        };
    });



};
