'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');



//RENDER VIEW LIST ALL ITEMS
router.get('/', function(req, res, next) {
  Item.find({}, function(err, items){

    console.log('err: '+err);
    console.log('items: '+items);

  res.render('item', { title: 'Express' });
});

});


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


//VIEW SINGLE ITEM
router.get('/view/:itemId', function(req, res, next) {
  var itemId = req.params.itemId;

  //get item from mongo via id using findbyid
  Item.findById(itemId, function(err, retreivedItem){
    console.log('item retrieved: '+retreivedItem);
    //res.render and send item as obj to jade file
    res.render('item', {item: retreivedItem});
  });





});





// //capture the potion  id from the url string (anything after ':')
// router.get('/:potionId', function(req, res){
//   //use req.params.potionId which is how we capture the url param to find the record via the model
//   //also use "findOne instead of find to get only one"
//   //or you can use findById
//   Potion.findById( req.params.potionId , function(err, potion){
//
//     console.log('potion: '+ potion);
//     res.send(potion);
//
//   });
//
// });









// router.get('/view/:contactKey', function(req, res, next){
//
//   var arr = [];
//   var retrievalKey = req.params.contactKey;
//   console.log('the key from url: '+retrievalKey);
//   var retrievedContact = {};
//
//   console.log(req.body);
//
//   fs.readFile('./data/data.json', function(err, data) {
//     if(err){
//       return res.status(400).send(err);
//     }
//     arr = (JSON.parse(data) || []);
//
//
//   // var retrievalKey = req.body.key;
//   console.log('retrieval key is: '+retrievalKey);
//   console.log('arr is:'+arr);
//
//   // var retrievedContact = arr.filter(function( obj ) {
//   // return obj.dateid === retrievalKey;})[0];
//
//   for (var i=0; i<arr.length; i++) {
//     if (arr[i].dateid === retrievalKey){
//       retrievedContact = arr[i];
//     }
//   }
//
//
//   console.log(retrievedContact);
//
//   console.log('retrieved contact:  '+JSON.stringify(retrievedContact));
//   res.render('view', {retrievedContact: retrievedContact});
//   });
//
// });





module.exports = router;
