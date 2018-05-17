var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://hamza.utd7:Mlab343215@ds043002.mlab.com:43002/todoapp' ||'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};