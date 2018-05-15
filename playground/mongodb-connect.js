//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to database');
    }
        console.log('Connected to database');
        const db = client.db('TodoApp');

        // db.collection('Todos').insertOne({
        //     text: 'to do something',
        //     completed: false
        // }, (err, res) => {
        //     if(err)
        //     return console.log('Error aagya hai '+ err);

        //     console.log(JSON.stringify(res.ops, undefined, 2));
        // });
            
        db.collection('Users').insertOne({
            _id: 123,
            name: 'Hamaza',
            age: 22,
            city: 'Islamabad'
        }, (err, res) => {
            if(err)
            return console.log('Error aagya hai '+ err);

            console.log(JSON.stringify(res.ops, undefined, 2));
        });
        
     client.close();     
});