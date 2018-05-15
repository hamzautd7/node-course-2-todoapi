//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to database');
    }
        console.log('Connected to database');
        const db = client.db('TodoApp');

    //     db.collection('Todos').find({completed: false}).toArray().then((docs)=> {
    //         console.log(JSON.stringify(docs,undefined, 2));
    //     }, (err)=>{
    //         console.log(`Unable to fetch the data ${err}`);
    // });
//     db.collection('Todos').find().count().then((count)=> {
//         console.log(`count: ${count}`);
//     }, (err)=>{
//         console.log(`Unable to fetch the data ${err}`);
// });
db.collection('Users').find({name: 'Hamza'}).toArray().then((docs)=> {
    console.log(JSON.stringify(docs,undefined, 2));
}, (err)=>{
    console.log(`Unable to fetch the data ${err}`);
});
    // client.close();     
});