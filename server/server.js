var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req,res)=>
{
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send("ID NOT VALID");
  }
Todo.findByIdAndRemove(id).then((todo)=>{  
  if(!todo)
    return res.status(404).send();
 
    res.status(200).send(todo);

}).catch((e)=>{
  res.status(400).send(e);
})
});

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body =req.body ;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send("ID NOT VALID");
  }
  if(_.isBoolean(body.completed) && body.completed)
  body.completedAt = new Date().getTime();
  else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((doc)=>{
    if(!doc)
    return res.status(404).send();
    
    res.send({todo: doc});
    
  },(e)=>{
    res.status(400).send(e);
  })
})





app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
