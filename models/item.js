'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  description: String,
  price: Number,
  name: String,
  image: String,
  category: String
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
