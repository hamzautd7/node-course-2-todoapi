var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

const port =process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res) =>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))
    return res.status(404).send();

    Todo.findById(id)
    .then((todo)=>{
        if(!todo)
        res.status(404).send();

        res.status(200).send(todo);
    },(e)=>{
        res.status(400).send();
    })
});

app.listen(port, ()=>{
    console.log(`Started server on port `+ port);
})

