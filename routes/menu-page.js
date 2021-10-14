var express = require('express');
var router = express.Router();
var path = '/stylesheets/menu-page.css';
var url = 'mongodb://localhost:27017/shopping';
var mongo = require('mongoose');
var assert = require('assert');
var highlight = [];
var coffee = [];
var tea = [];
var daxay = [];
var traicay = [];

router.get('/menu', function(req, res, next) {

        mongo.connect(url,{useNewUrlParser:true},function(err ,db) {
                assert.equal(null, err);
                db.collection('products').find().limit(6).toArray(function (err,docs) {
                        if (err) throw err;
                        // console.log(docs);
                        highlight.push(docs);
                        db.close();
                });
        });
        mongo.connect(url,{useNewUrlParser:true},function(err ,db){
                var cf = {type:"CÀ PHÊ"};
                db.collection('products').find(cf).toArray(function (err,docs) {
                        if (err) throw err;
                        // console.log(docs);
                        coffee.push(docs);
                        db.close();
                });
        });
        mongo.connect(url,{useNewUrlParser:true},function(err ,db) {
                var t = {type: 'TRÀ & MACCHIATO'};
                db.collection('products').find(t).toArray(function (err, docs) {
                        if (err) throw err;
                        // console.log(docs);
                        tea.push(docs);
                        db.close();
                });
        });
        mongo.connect(url,{useNewUrlParser:true},function(err ,db) {
                var dx = {type: 'THỨC UỐNG ĐÁ XAY'}
                db.collection('products').find(dx).toArray(function (err, docs) {
                        if (err) throw err;
                        // console.log(docs);
                        daxay.push(docs);
                        db.close();
                });
        });
        mongo.connect(url,{useNewUrlParser:true},function(err ,db) {
                var tc = {type: 'THỨC UỐNG TRÁI CÂY'}
                db.collection('products').find(tc).toArray(function (err, docs) {
                        if (err) throw err;
                        // console.log(docs);
                        traicay.push(docs);
                        db.close();
                });
        });
                        res.render('shop/menu-page', {title:'Menu-tictac',highlight: highlight , coffe:coffee,tea:tea,daxay:daxay,traicay:traicay,promenu_css:path});
});
module.exports = router;