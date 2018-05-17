var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', ({
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    completedAt:{
        type: Number,
    } 
}));
module.exports = {Todo};