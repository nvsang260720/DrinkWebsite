var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
var mongo = require('mongoose');
var url = 'mongodb://localhost:27017/shopping';
var assert = require('assert');
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
// css
var pathAbout = '/stylesheets/about-page.css';
var pathMenu ='/stylesheets/menu-page.css';
var pathInfo = '/stylesheets/info-dish.css';
var pathBlog = '/stylesheets/blog-page.css';
var pathCart = '/stylesheets/shopping-cart-page.css';
// var objectId = require('mongoose');
var id = [];
var type = [];
/* GET home page. */
router.get('/', function (req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function (err, docs) {
    var resultArray = [];
    var chunkSize = 4;
    for (var i = 0; i < 8; i += chunkSize) {
      resultArray.push(docs.slice(i, i + chunkSize));
    }
      res.render('shop/home', {title: 'Home', products: resultArray,successMsg: successMsg, noMessages: !successMsg});
    });
  });


router.get('/menu', function(req, res, next) {
    var highlight = [];
    var coffe = [];
    var dx = [];
    var tea = [];
    var tc = [];
    Product.find(function (err, docs) {
        var chunkSize = 4;
        for (var i = 0; i < 8; i += chunkSize) {
            highlight.push(docs.slice(i, i + chunkSize));
        }
    });
    Product.find({type:"CÀ PHÊ"},function (err,docs) {
        coffe.push(docs);
    });
    Product.find({type: "TRÀ & MACCHIATO"}, function (err, docs) {
        tea.push(docs);
    });
    Product.find({type: "THỨC UỐNG ĐÁ XAY"}, function (err, docs) {
        dx.push(docs);
    });
    Product.find({type: "THỨC UỐNG TRÁI CÂY"}, function (err, docs) {
        tc.push(docs);
    });
    res.render('shop/menu-page', {
        title: 'Menu',
        HIGHLIGHT: highlight,
        CAPHE: coffe,
        TEA: tea,
        DAXAY: dx,
        TRAICAY: tc,
        promenu_css: pathMenu
    });
});

// router.get('/menu', function(req, res, next) {
//   var highlight = [];
//   var categories = ["CÀ PHÊ","TRÀ & MACCHIATO","THỨC UỐNG ĐÁ XAY","THỨC UỐNG TRÁI CÂY"];
//   var filter = [];
//       Product.find(function (err, docs) {
//           var chunkSize = 3;
//           for (var i = 0; i < 6; i += chunkSize) {
//            highlight.push(docs.slice(i, i + chunkSize));
//           }
//           });
//       categories.forEach(function (docs,err) {
//           // console.log(docs);
//           Product.find({type:docs},function (err,results) {
//               // console.log(results);
//               filter.push(results);
//           });
//       });
//             res.render('shop/menu-page', {
//               title: 'Menu',
//               HIGHLIGHT: highlight,
//               FILTER: filter,
//               promenu_css: pathMenu
//             });
//           });

router.get('/about',function (req,res,next) { // chọn tên đường đẫn đéo
  res.render('shop/about-page',{title:'Giới thiệu',about_css:pathAbout}); // chọn đường đẫn đến file  , giờ là admin-rac/GUI.hbs
});
router.get('/info-product/:id',function (req,res,next) {
  id = req.params.id;
  Product.findById(id, function(err, product) {
    if (err) {
      return res.redirect('/home');
    }
    type = product.type;
    // console.log(product.type);
    res.redirect('/home/info');
  });
});
router.get('/info',function (req,res,next) {
  var info  = [];
  var relate = [];
    Product.find({_id:id},function (err,docs) {
        info.push(docs);
    });
    Product.find({type:type},function (err,docs) {
      // console.log(type);
        relate.push(docs);
    });
    res.render('shop/info-dish',{title:'Thông tin',info:info,relate:relate,infor_css:pathInfo}); // chọn đường đẫn đến file  , giờ là admin-rac/GUI.hbs
});


router.get('/blogs/news', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},function(err ,db) {
    assert.equal(null, err);
    var blog = [];
    db.collection('blog').find().limit(4).toArray(function (err,docs) {
      if (err) throw err;
      // console.log(docs);
      blog.push(docs);
    });
    res.render('shop/blog-page', {title:'BLOG',blog: blog ,blog_css:pathBlog});
  });

});

router.get('/add-to-cart/:id',isLoggedIn, function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/home');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/home');
    });
});

router.get('/add-product/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/home');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/home/shopping-cart');
    });
});

router.get('/sub-product/:id',function (req,res,next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/home');
    }
    cart.sub(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/home/shopping-cart');
  });
});

// router.post('/shopping-cart/:id',function (req , res , next) {
//     var productId = req.params.id;
//         Cart.deleteOne({_id: productId}, function(err, result) {
//             assert.equal(null, err);
//             if (err) {
//                 return res.redirect('/home');
//             }
//             console.log('Item deleted'+productId);
//             res.redirect('/home/shopping-cart');
//         });
// });
router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart-page', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart-page', {products: cart.generateArray(), totalPrice: cart.totalPrice , cart_css:pathCart});
});
router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/home/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout',isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/home/shopping-cart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")(
      "sk_test_fwmVPdJfpkmwlQRedXec5IxR"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "vnd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/home/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err,result) {
      req.flash('success', 'Successfully bought product!');
      req.session.cart = null;
      res.redirect('/home');
    });
  });
});
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
