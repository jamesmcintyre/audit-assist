var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var numeral = require('numeral');
var lodash = require('lodash');

//RENDER VIEW LIST ALL ITEMS
router.get('/', function(req, res, next) {

  Item.find({}, function(err, retrievedItems){

    var resultForView = [];

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

    var priceTotal = 0;

    for (var i = 0; i < resultForView.length ; i++){
      priceTotal += resultForView[i].priceval;
    }

    var priceTotalFormatted = numeral( priceTotal ).format('$0,0.00');

  res.render('index', {retrievedItems: resultForView,
    grandTotal: priceTotalFormatted});
});

});



module.exports = router;
