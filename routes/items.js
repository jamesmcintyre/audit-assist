'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var numeral = require('numeral');






//RENDER ADD ITEM VIEW & API TO POST NEW ITEM TO DB

/* GET add item page. */
router.get('/add', function(req, res, next) {
  res.render('add', {});
});

//POST ADD NEW ITEM
router.post('/add', function(req, res, next) {

  var item = new Item(req.body);
  console.log('received item: ', item);
  item.save(function(err, savedItem){
    console.log('err'+err);
    console.log('saved item: '+savedItem);
    res.send(savedItem);
  })

});

// UPDATE ITEM
router.put('/edit/:itemId', function(req, res, next) {

  var itemUpdate = new Item(req.body);
  var itemId = req.params.itemId;

  //get item from mongo via id using findbyid
  Item.findById(itemId, function(err, retreivedItem){

    retreivedItem.description = itemUpdate.description;
    retreivedItem.price = itemUpdate.price;
    retreivedItem.name = itemUpdate.name;
    retreivedItem.image = itemUpdate.image;

    retreivedItem.save(function(err, savedItem){
      if (err) res.send(err);
      res.send( savedItem._id );

    });
  });
});


// DELETE AN ITEM
router.delete('/delete/:itemId', function(req, res, next){
  var itemId = req.params.itemId;
  //get item from mongo via id using findbyid
  Item.findById(itemId, function(err, retreivedItem){

    retreivedItem.remove(function(err){
      res.status(err ? 400 : 200).send(err || null);
    });
  });
})



//VIEW SINGLE ITEM
router.get('/view/:itemId', function(req, res, next) {
  var itemId = req.params.itemId;

  //get item from mongo via id using findbyid
  Item.findById(itemId, function(err, retrievedItem){
    console.log('item retrieved: '+retrievedItem);

    var objForRender = {
      name: retrievedItem.name,
      price: numeral( retrievedItem.price ).format('$0,0.00'),
      description: retrievedItem.description,
      _id: retrievedItem._id,
      image: retrievedItem.image
    };

    //res.render and send item as obj to jade file
    res.render('item', {item: objForRender});
    res.end();

  });

});

//RENDER VIEW TO EDIT SINGLE ITEM
router.get('/edit/:itemId', function(req, res, next) {
  var itemId = req.params.itemId;

  //get item from mongo via id using findbyid
  Item.findById(itemId, function(err, retreivedItem){
    console.log('item retrieved: '+retreivedItem);
    //res.render and send item as obj to jade file
    res.render('edit', {item: retreivedItem});
  });

});


module.exports = router;
