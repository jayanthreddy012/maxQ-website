var express = require('express');
let aws = require('aws-sdk');
aws.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});
let docclient = new aws.DynamoDB.DocumentClient();
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
/* GET users listing. */
router.post('/',[check('firstname').not().isEmpty().withMessage('firstname cannot be empty.'),
    check('lastname').not().isEmpty().withMessage('lastname cannot be empty.'),
    check('email').not().isEmpty().withMessage('email cannot be empty.')
], function (req, res, next) {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        var params = {
            TableName : "user_table",
            Item: {
                "user_name": req.body.firstname+" "+req.body.lastname ,
                "user_email": req.body.email
            }
        };
        docclient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log(" item:", JSON.stringify(data, null, 2));
            }

        });
        let newuser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }
        res.redirect('/');

    }
    else {
        console.log(errors.array());
        res.render('index', {title: 'Express node js app', body: 'express body', errors: errors.array(),
            data: [{temp1: '23.1', box_id: 2},
                {temp1: '25.2', box_id: 1},
                {temp1: '26.7', box_id: 5}
            ]});
    }

});

module.exports = router;
