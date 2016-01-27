'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');


router.get('/', function(req, res, next) {
  Item.find({}, function(err, items){
//TODO pull current list of items for index display
    console.log('err: '+err);
    console.log('items: '+items);

  res.render('item', { title: 'Express' });
});

});


router.post('/add', function(req, res, next) {

  var item = new Item(req.body);

  console.log('received item: ', item);

  item.save(function(err, savedItem){
    console.log('err'+err);
    console.log('saved item: '+savedItem);

    res.send(savedItem);
  })

  res.render('item', { title: 'Express' });
});






module.exports = router;

// //pull in the potion model you created
// var Potion = require('../models/potion');
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   //call potion model to try and get an array of documents/potions
//   Potion.find({}, function(err, potions){
//     console.log('err: '+err);
//     console.log('potions: '+potions);
//
//     res.send(potions);
//   })
//   // res.render('index', { title: 'Express' });
// });
