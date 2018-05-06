
const express = require('express');
const User = require('../models/User');

// veridica se o token bate o usuario 
exports.authorized = (req, res, next)=>{
    let token = req.cookies.auth;
    User.findByToken(token, (err, user)=>{
        if(err) return next(err)
        if(user){
            // deixar o user para a proxima rota
            req.user = user;
            next();
        }else{
            res.status(401);
            next(new Error("not authorized"));
        }        
    })    
}