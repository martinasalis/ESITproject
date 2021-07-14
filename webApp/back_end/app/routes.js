// grab the nerd model we just created
const Models = require('./models/models');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/models', function(req, res) {
        // use mongoose to get all nerds in the database
        Models.find(function(err, models) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(models); // return all nerds in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./../../angular12project/src/index.html'); // load our src/index.html file
    });

};
