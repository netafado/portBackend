const mongoose  = require( 'mongoose' );
const Schema    = mongoose.Schema;
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Você precisa passar um nome"
    },
    password:{
        type: String,
        required:true,
        minlength: 6
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    email:{
        type: String,
        trim: true,
        required: "O email é obrigatório",
        unique: 1
    },
    token:{

    }
});


userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) throw cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var genToken = jwt.sign(user._id.toHexString(), process.env._SUPER_SECRETE);
    
    user.token = genToken;
    user.save(function(err){
        if(err) return cb(err);
        cb(null, user)
    })
}


userSchema.statics.findByToken = function(token, cb){
    const user = this;
    jwt.verify(token, process.env._SUPER_SECRETE, function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err)return cb(err)
            cb(null, user)
        })
    })
}

// middleware para hash o passowobgcnv brd
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt( 10,function(err, salt){
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else{
        next()
    }
});

module.exports = mongoose.model("User", userSchema);