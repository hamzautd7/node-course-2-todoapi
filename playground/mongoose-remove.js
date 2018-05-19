const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');
const {ObjectID} = require('mongodb');

Todo.create({
    text:"from node",
    completed: true,
    completedAt: 324
}).then((res)=>{
    console.log("Added new document "+ JSON.stringify(res, undefined, 2));
},(e)=>{
console.log(e);
})

// Todo.findOneAndRemove({text: 'from node'}).then((res)=>{
//     console.log('removed document '+ res);
// },(e)=>{
//     console.log(e);
// })
    
// Todo.remove({}).then((res)=>{
//     console.log(res);
// });