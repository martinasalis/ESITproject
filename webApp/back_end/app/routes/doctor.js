const Doctor = require('../models/doctor')

exports = module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.post('/info', function(req, res) {
        // use mongoose to check if username and password is true or not
        Doctor.findOne({_id: req.body._id}, function(err, doc) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(doc); // return response
        });
    });

};
