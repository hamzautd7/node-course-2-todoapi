const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: validator.isEmail,
        message: "{value} is not a valid Email address"
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    tokens:[{
        access:{
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true    
        }
    }]
});


 userSchema.methods.toJSON = function(){
     var user = this;
     var userObject = user.toObject();
     var {_id,email} = userObject;
     return {_id,email};
 }

userSchema.methods.generateAuthToken = function()
{
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id: user._id.toHexString(),access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access, token}]);
    //console.log("2- "+tokens.access+' T: '+ tokens.token);
    return user.save().then(()=>{
        return token;
    });
}

var User = mongoose.model('User', userSchema);
module.exports = {User};