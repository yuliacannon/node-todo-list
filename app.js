const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('basic-auth');
const Todo = require('./Todo');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

process.env.MONGO_URL = 'mongodb://yuliacannon:qwe123@ds111765.mlab.com:11765/firstdb';
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("CONNECTED TO DB");
});


// basic auth
app.use((req, res, next) => {
  const credentials = auth(req);
  if (!credentials || credentials.name !== 'admin' || credentials.pass !== '1234'){
    console.log('Auth failed');
      next({
          status: 403,
          error: 'You are not authorized!'
      });
    
  } else {
    console.log('Auth passed!')
    next();
  }
});

app.get('/',  (req, res) => {
  res.send('Hello World!');
});

// to get the list of todos from db
app.get('/todo',(req, res, next) =>{
  Todo.find( (err, todos) => {
    if (err) {
      return next(new Error(err))
    }
    res.json(todos)
  })
})

// to add todo task
app.post('/todo', (req, res) => {
  Todo.create(
    {
      text: req.body.text,
      done: false
    },
    (error, todo) => {
      if (error) {
        res.status(400).send('Unable to create todo list')
      }
      res.status(200).json(todo)
    }
  )
  //Todo.stat
})

// to remove todo item

app.delete('/todo/:id', (req, res, next) => {
  const id = req.params.id;
  Todo.remove({_id: id},  (err, todo) => {
    if (err) {
      return next(new Error('Todo was not found'))
    }
    res.json('Successfully removed')
  })
})


//  to mark todo item as done/undone

app.put('/todo/:id', (req, res, next) => {
  Todo.findById(req.params.id, (err, todo) => {

    if (err)
        res.send(err);

    todo.done = !todo.done;
    todo.save((err) => {
        if (err)
            res.send(err);

        res.json(todo);
    });

});
})


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});