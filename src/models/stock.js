const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  open: Number,
  high: Number,  
  low: Number,
  close: Number,
  isFavorite: { type: Boolean, default: false },
  date:{
    type:Date,
    default: Date.now,
  }

});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
