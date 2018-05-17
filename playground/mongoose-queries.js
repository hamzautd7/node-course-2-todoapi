const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');
const {ObjectID} = require('mongodb');

//var id = "6afc92647373ca2a708f0387";
var id = "5afb5f08cf90f63b30ad4b4e";

if(!ObjectID.isValid(id))
console.log("ID not Valid");


User.findById({
    _id: id
}).then((user)=>{
    if(!user)
    {
       return console.log("user not found");
    }
    console.log("User: "+ user);
}).catch((e)=>{
    console.log(e);
})
// Todo.findById({
//     _id: id
// }).then((todos)=>{
//     if(!todos){
//      return console.log("Not found");
//     }
//     console.log("todos "+ todos);
// },(e)=>{
//     console.log(e);
// });

// Todo.findOne().then((todo)=>{
//     console.log("todo "+ todo);
//     },(e)=>{
//         console.log(e);
//     });
    