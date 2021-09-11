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

};
