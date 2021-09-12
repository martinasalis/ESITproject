const Board = require('../models/board');

exports = module.exports = function(app) {

    // server routes ===========================================================

    app.post('/insertBoard', function(req, res) {
        // Insert a new board
        Board.insertMany([{mac: req.body.board, patient: req.body.patient}], function(err, board) {
            // Error occurred
            if(err)
                res.send(err);

            res.json(board);
        });
    });

};
