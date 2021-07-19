// grab the nerd model we just created
const Models = require('./models/models');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.post('/login', function(req, res) {
        // use mongoose to check if username and password is true or not
        Models.find({username: req.body.username, password: req.body.password}, function(err, user) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(user); // return response
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile('/home/luca/Documenti/ESIT/project/webApp/angular12project/src/app/login-form/login-form.component.html'); // load our src/index.html file
    });


};
