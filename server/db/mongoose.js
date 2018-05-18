var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://banda:123456@ds016068.mlab.com:16068/todos'
};
var x = 'mongodb://banda:123456@ds016068.mlab.com:16068/todos';
mongoose.connect( process.env.x );


module.exports = {mongoose};
