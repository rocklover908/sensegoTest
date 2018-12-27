const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 let Data = new Schema({
    user_id: {
    type: String
  },
  app: {
    type: String
  },
  timestamp: {
    type: Date
  }
},{
  collection: 'data'
});

module.exports = mongoose.model('Data', Data);