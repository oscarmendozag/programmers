var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Coin = new Schema({
  nombre: {
    type: String
  },
  apaterno: {
    type: String
  },
  correo: {
    type: String
  },
  password: {
    type: String
  }
},{
    collection: 'coins'
});

module.exports = mongoose.model('Coin', Coin);