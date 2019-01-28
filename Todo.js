const mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(mongoose);

// const todo = new mongoose.Schema({
//   text:  String,
//   done:  Boolean  
// });


const schema = Joi.object({
  text: Joi.string().required().max(30),
  done: Joi.boolean().required()
});

// converting Joi schema to a Mongoose-style schema
const todo = new mongoose.Schema(Joigoose.convert(schema));
module.exports = mongoose.model('Todo', todo);