const User = require('../models/user');
const AWS = require("aws-sdk");
const generator = require('generate-password');

exports = module.exports = function(app) {

    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.update({region: 'us-east-2'});
    const ses = new AWS.SES();

    // server routes ===========================================================

    app.post('/login', function(req, res) {
        // Login
        User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
            // Error occurred in login
            if(err)
                res.send(err);

            res.json(user);
        });
    });

    app.post('/recoveryPassword', function(req, res) {
        // Generate default password for new user
        let password = generator.generate({
            length: 10,
            numbers: true
        });

        const params_mail = {
            Source: "lucagra97@live.it",
            Destination: {
                ToAddresses: [
                    req.body.mail
                ],
            },
            Message: {
                Subject: {
                    Data: "Nuova password utente",
                    Charset: "UTF-8"
                },
                Body: {
                    Text: {
                        Data: "Nuova password utente",
                        Charset: "UTF-8"
                    },
                    Html: {
                        Data: "<html><head></head><body><h1>Nuova password</h1><p>La tua nuova password è: " + password + "</p></body></html>",
                        Charset: "UTF-8"
                    }
                }
            }
        };

        ses.sendEmail(params_mail, function(err, data) {
            if(err) {
                console.log(err.message);
            }
            else {
                console.log("Email sent! Message ID: ", data.MessageId);
            }
        });

        // Recovery password
        User.updateOne({mail: req.body.mail}, {password: password}, function(err, user) {
            // Error
            if(err)
                res.send(err);
            else
                res.json(user);
        });
    });

    app.post('/infoUser', function(req, res) {
        // Login
        User.findOne({_id: req.body._id}, function(err, user) {
            // Error occurred in login
            if(err)
                res.send(err);
            else
                res.json(user);
        });
    });

    app.post('/patientsData', function(req, res) {
        // Get all users data
        User.find({_id: {$in:req.body._ids}}, function(err, users) {
            // Error occurred
            if(err)
                res.send(err);
            else
                res.json(users);
        });
    });

    app.post('/doctorsData', function(req, res) {
        // Get all users data
        User.find({_id: {$in:req.body._ids}}, function(err, users) {
            // Error occurred
            if(err)
                res.send(err);
            else
                res.json(users);
        });
    });

    app.post('/searchDoctorUsers', function(req, res) {
        let param = req.body.param;

        // Get a user that match with param and type
        User.find({$and: [{$or: [{_id: {$regex: param, $options: 'i'}}, {name: {$regex: param, $options: 'i'}}, {surname: {$regex: param, $options: 'i'}}]}, {type: req.body.type}, {_id: {$in:req.body._ids}}]}, function(err, users) {
            // Error
            if(err)
                res.send(err);
            else
                res.json(users);
        });
    });

    app.post('/searchUsers', function(req, res) {
        let param = req.body.param;

        // Get a user that match with param and type
        User.find({$and: [{$or: [{_id: {$regex: param, $options: 'i'}}, {name: {$regex: param, $options: 'i'}}, {surname: {$regex: param, $options: 'i'}}]}, {type: req.body.type}]},
            function(err, users) {
                // Error
                if(err)
                    res.send(err);

                res.json(users);
            });
    });

    app.post('/updateUser', function(req, res) {
        let updateData = req.body.info;

        // Update user
        User.updateOne({_id: req.body._id}, {_id: updateData._id, name: updateData.name, surname: updateData.surname, username: updateData.username, password: updateData.password, mail: updateData.mail, phone: updateData.phone, dob: updateData.dob, type: updateData.type}, function(err, user) {
            if(err) // Error in update
                res.send(err);

            res.json(user.ok);
        });
    });

    app.post('/deleteUser', function(req, res) {
        // Delete e-mail address from aws ses
        User.findOne({_id: req.body._id}, function(err, user) {
            // Error occurred in login
            if(err)
                res.send(err);
            else {
                const params = {
                    Identity: user.mail
                };

                ses.deleteIdentity(params, function(err, data) {
                    if(err)
                        console.log(err, err.stack); // an error occurred
                    else
                        console.log(data);           // successful response
                });
            }
        });

        // Delete a specific user
        User.deleteOne({_id: req.body._id}, function(err, user) {
            // Error
            if(err)
                res.send(err);

            res.json(user.ok);
        });
    });

    app.post('/insertUser', function(req, res) {
        // Generate default password for new user
        let password = generator.generate({
            length: 10,
            numbers: true
        });

        // Add e-mail address to aws ses
        const params = {
            EmailAddress: req.body.mail
        };

        ses.verifyEmailIdentity(params, function(err, data) {
            if(err)
                console.log(err, err.stack); // an error occurred
            else
                console.log(data);
        });

        console.log(password);

        // Insert new user
        User.insertMany([{_id: req.body._id, name: req.body.name, surname: req.body.surname, username: req.body.username, password: password, mail: req.body.mail, phone: req.body.phone, dob: req.body.dob, type: req.body.type}], function(err, user) {
            // Error
            if(err)
                res.send(err);

            res.json(user);
        });

        const params_mail = {
            Source: "lucagra97@live.it",
            Destination: {
                ToAddresses: [
                    req.body.mail
                ],
            },
            Message: {
                Subject: {
                    Data: "Password nuovo utente",
                    Charset: "UTF-8"
                },
                Body: {
                    Text: {
                        Data: "Password nuovo utente",
                        Charset: "UTF-8"
                    },
                    Html: {
                        Data: "<html><head></head><body><h1>Nuova password</h1><p>La tua password è: " + password + "</p></body></html>",
                        Charset: "UTF-8"
                    }
                }
            }
        };

        // Send new password after two minutes
        function send_mail() {
            ses.sendEmail(params_mail, function(err, data) {
                if(err) {
                    console.log(err.message);
                }
                else {
                    console.log("Email sent! Message ID: ", data.MessageId);
                }
            });
        }
        setTimeout(send_mail, 120000);
    });

};
