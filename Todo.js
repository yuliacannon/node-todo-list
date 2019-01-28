const mongoose = require('mongoose');
const Joi = require('joi');


const todo = new mongoose.Schema({
  text:  String,
  done:  Boolean  
});

todo.methods.JoiValidate = obj =>{
  const schema = {
    text: Joi.string().required().max(30),
    done: Joi.boolean().required()
  }
  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('Todo', todo);