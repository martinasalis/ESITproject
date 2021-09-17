const BoardSensor = require('../models/board_sensor')

exports = module.exports = function(app) {

    // server routes ===========================================================

    app.post('/boardSensors', function(req, res) {
        // Get all sensors of a specific board
        BoardSensor.find({board: req.body.board}, function(err, snr) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(snr);
        });
    });

    app.post('/insertBoardSensors', function (req, res) {
        console.log(req.body);
        // Insert a new sensor in patient's board
        BoardSensor.insertMany([{board: req.body.board, sensor: req.body.sensor, threshold: req.body.threshold}], function(err, doc) {
            // Error
            if(err)
                res.send(err);

            res.json(doc);
        });
    });

};
