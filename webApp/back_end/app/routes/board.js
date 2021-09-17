const Board = require('../models/board');
const AWS = require("aws-sdk");

exports = module.exports = function(app) {

    // server routes ===========================================================

    app.post('/insertBoard', function(req, res) {

        let iot = new AWS.Iot();

        // Create certificate
        iot.createKeysAndCertificate({setAsActive: true}, function(err, keysAndCertificate) {
            if(err)
                res.send(err); // an error occurred
            else {

                // Define params to create policy
                let params = {
                    policyDocument: JSON.stringify({
                        "Version": "2012-10-17",
                        "Statement": [
                            {
                                "Effect": "Allow",
                                "Action": [
                                    "iot:*"
                                ],
                                "Resource": [
                                    "*"
                                ]
                            }
                        ]
                    }),
                    policyName: "policy-" + req.body.board,
                    tags: [
                        {
                            Key: "policy",
                            Value: "policy"
                        }
                    ]
                };

                // Create policy
                iot.createPolicy(params, function(err, policy) {
                    if(err)
                        console.log(err, err.stack); // an error occurred
                    else {

                        // Define params to attach policy and certificate
                        params = {
                            policyName: policy.policyName,
                            target: keysAndCertificate.certificateArn
                        };

                        // Attach policy and certificate
                        iot.attachPolicy(params, function(err, data) {
                            if(err)
                                console.log(err, err.stack); // an error occurred
                            else {
                                console.log(data);

                                // Create thing
                                iot.createThing({thingName: "obj-" + req.body.board}, function(err, thing) {
                                    if(err)
                                        console.log(err, err.stack); // an error occurred
                                    else {

                                        // Define params to attach thing to certificate
                                        params = {
                                            principal: keysAndCertificate.certificateArn,
                                            thingName: thing.thingName
                                        };

                                        // Attach thing to certificate
                                        iot.attachThingPrincipal(params, function(err, data) {
                                            if(err)
                                                console.log(err, err.stack); // an error occurred
                                            else {
                                                console.log(data);           // successful response
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

};
