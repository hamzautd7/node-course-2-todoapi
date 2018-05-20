var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var {authenticate} = require('./middleware/authenticate');
var app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');

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
  var body =_.pick(req.body['text', 'completed']) ;
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

app.post('/users', (req, res)=>{
  //console.log('req.body'+ JSON.stringify(req.body, undefined, 2));
  //var userbody = _.pick(req.body,['email', 'password']);
  //console.log('body'+ JSON.stringify(userbody, undefined, 2));
  var {email, password} = req.body;
  var user = new User({email,password});

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

app.get('/users/me',authenticate, (req,res) =>{
    res.send(req.user);
});


app.post('/users/login', (req, res) =>{
  var {email, password} = req.body;
  User.findByCredentials(email,password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth', token).send(user);
    })
  }).catch((e)=>{
    res.status(400).send()
  })
});
app.delete('users/me/token',authenticate,  (req,res)=>{
req.user.removetoken(req.token).then(()=>{
  res.send();
}).catch((e)=>{
  res.status(400).send(e)
})
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
