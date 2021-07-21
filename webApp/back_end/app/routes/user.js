const User = require('../models/user')

exports = module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.post('/login', function(req, res) {
        // use mongoose to check if username and password is true or not
        User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(user); // return response
        });
    });
};
