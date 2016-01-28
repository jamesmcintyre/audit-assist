var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {});
// });

//RENDER VIEW LIST ALL ITEMS
router.get('/', function(req, res, next) {

console.log('testttttt');
  Item.find({}, function(err, items){

    console.log('err: '+err);
    console.log('items: '+items);

  // res.render('index', {});
  res.send(items);
});

});



module.exports = router;
