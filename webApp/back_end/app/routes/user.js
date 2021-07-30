const User = require('../models/user')

exports = module.exports = function(app) {

    // server routes ===========================================================

    app.post('/login', function(req, res) {
        // Login
        User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {

            // Error occurred in login
            if (err)
                res.send(err);

            res.json(user);
        });
    });

    app.post('/updateUser', function(req, res) {
        let updateData = req.body.info;

        // Update user
        User.updateOne({_id: req.body._id},
            {_id: updateData._id, name: updateData.name, surname: updateData.surname, username: updateData.username, password: updateData.password, type: updateData.type},
            function(err, user) {
            if(err) // Error in update
                res.send(err);

            res.json(user.ok);
        });
    });

    app.post('/deleteUser', function(req, res) {
        // Delete a specific user
        User.deleteOne({_id: req.body._id}, function(err, user) {
            // Error
            if(err)
                res.send(err);

            res.json(user.ok);
        });
    });

    app.post('/insertUser', function(req, res) {
        // Insert new user
        User.insertMany([{_id: req.body._id, name: req.body.name, surname: req.body.surname, username: req.body.username, password: req.body.password, type: req.body.type}])
            .then(res.json({ok: 1}))
            .catch(res.json({ok: 0}));
    });

};
