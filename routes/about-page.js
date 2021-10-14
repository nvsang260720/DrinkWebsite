var express = require('express');
var router = express.Router();
var pathAbout = '/stylesheets/about-page.css';
router.get('/about',function (req,res,next) { // chọn tên đường đẫn đéo
    res.render('shop/about-page.hbs',{title:'Giới thiệu',about_css:pathAbout}); // chọn đường đẫn đến file  , giờ là admin-rac/GUI.hbs
});
module.exports = router;