const express =  require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUser = (req, res, next)=>{
    res.send('userGet');
}

exports.insertUser = (req, res, next)=>{
    let user =  new User(req.body);
    user.save()
        .then((user)=>{
            if(user){
                res.send('insetUser');
            }
        })
        .catch(err =>{ return next(err)})
}

exports.deleteUser = (req, res, next)=>{
    res.send('deleteUser');
}

exports.userlogIn = (req, res, next)=>{   
    let email   = req.body.email;
    let pass    = req.body.password;
    console.log();
    User.findOne({"email": email})
        .then((user)=>{
            if(!user)
                res.send('User not fount, outh failed')    
            user.comparePassword(pass, (err, isMatch)=>{
                if(err) return next(err)
                if(isMatch)
                {
                    user.generateToken((err, user)=>{
                        if(err) res.status(400).send("something bad happen");
                        res.cookie('auth', user.token);
                        console.log(user.token);
                        res.json({message: "User is log in the system: " + user.token, password: isMatch} )
                    })                   
                    
                }else{
                    res.json({message: "Incorret pass", password: isMatch} )
                }
            })           
        })
        .catch(err =>{ return next(err)})
}

exports.updateUser = (req, res, next)=>{
    res.send('updateUser');
}

exports.userProfile = (req, res, next)=>{
    res.send('dentro do profile');   
}