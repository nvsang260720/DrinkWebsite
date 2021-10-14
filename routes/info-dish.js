var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongo = require('mongoose');
var url = 'mongodb/localhost:27017/shopping';
var path = '/stylesheets/info-dish.css';

router.get('/infor',function (req,res,next) {

        res.render('shop/info-dish',{title:'infor',infor_css:path});
});

module.exports = router;