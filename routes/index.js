var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express node js app', body: 'express body',
        data: [{temp1: '23.1', box_id: 2},
            {temp1: '25.2', box_id: 1},
            {temp1: '26.7', box_id: 5}
        ]});
});

module.exports = router;
