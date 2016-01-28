var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var numeral = require('numeral');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {});
// });

//RENDER VIEW LIST ALL ITEMS
router.get('/', function(req, res, next) {

  console.log('testttttt');
  //res.send('test message');

  Item.find({}, function(err, retrievedItems){

    console.log('err: '+err);
    console.log('items: '+retrievedItems);

    resultForView = [];

    //iterate through items
    Object.keys(retrievedItems).forEach(function(key) {

      var pushObj = {
        name: retrievedItems[key].name,
        price: numeral( retrievedItems[key].price ).format('$0,0.00'),
        priceval: retrievedItems[key].price,
        description: retrievedItems[key].description,
        id: retrievedItems[key]._id
      };
      resultForView.push(pushObj);
    });

    console.log('resultForView: '+resultForView);
    var priceTotal = 0;
    for (var i = 0; i < resultForView.length ; i++){
      console.log(i);
      priceTotal += resultForView[i].priceval;
    }
    var priceTotalFormatted = numeral( priceTotal ).format('$0,0.00');

    console.log(priceTotalFormatted);

    // Object.keys(retrievedItems).forEach(function(key) {
    //   console.log(retrievedItems[key].price);
    //   // console.log(retrievedItems[key].price);
    // });

  res.render('index', {retrievedItems: resultForView, grandTotal: priceTotalFormatted});
  // res.send('test message');
});

});



module.exports = router;
