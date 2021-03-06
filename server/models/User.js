const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
userSchema.methods.removetoken = function(token)
{
    var user = this;

    user.update({
        $pull: {
            tokens: {token}
        }
    })

}

userSchema.statics.findByToken = function(token)
{  
    var user = this;
    var decode;
    try{
        decode = jwt.verify(token, 'abc123');
        
    }catch (e){
        return Promise.reject();
    }
    return  User.findOne(({
        _id: decode._id,
        'tokens.token': token, //need the quotes when there is a dot.
        'tokens.access': 'auth'
    }));
}
userSchema.statics.findByCredentials = function(email,password)
{
    return User.findOne({email}).then((user)=>{
        if(!user)
        return Promise.reject();
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password, (err,res)=>{
            if(res)
            resolve(user);
            else
            reject();
        })
    })
    
    })

       
      
}

userSchema.pre('save', function(next) {
    var user =this;
    if(user.isModified('password'))
    {
        console.log('Inside');
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
              console.log(hash);  
              user.password= hash;
                next();
            })
        })  
    } else{
        next();
    }
     
})

var User = mongoose.model('User', userSchema);
module.exports = {User};