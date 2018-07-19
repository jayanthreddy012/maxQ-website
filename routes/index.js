let express = require('express');
let router = express.Router();
let aws = require('aws-sdk');
aws.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});
let docclient = new aws.DynamoDB.DocumentClient();
/* GET home page. */
router.get('/', function (req, res, next) {
    let time=new Date().getTime()-600000;
    var params = {
        TableName : "shipment_table",

    };
    docclient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(time);
            console.log(" item:", JSON.stringify(data, null, 2));
        res.render('index', {title: 'Express node js app', body: 'express body' ,
            data: data.Items});}
    });

});

module.exports = router;
