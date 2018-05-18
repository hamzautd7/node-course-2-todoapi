var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'todouser:asdf@ds043002.mlab.com:43002/todoapp'
};
mongoose.connect(db.localhost || db.mlab );


module.exports = {mongoose};
