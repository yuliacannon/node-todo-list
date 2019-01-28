const mongoose = require('mongoose')

// Define collection and schema for todo item

const todo = new mongoose.Schema({
  text:  String,
  done:  Boolean  
})

module.exports = mongoose.model('Todo', todo);