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
    console.log(req.params.id);
    let id = req.params.id;

    User.findByIdAndRemove(id)
        .then((post)=>{
            if(post)
                return res.json({
                    message: "Usuário deletado com sucesso"
                })
            return res.json({
                message: "Opss.. Usuário não encontrado"
            })        
        })
        .catch(err=> next(err))
}

exports.userlogIn = (req, res, next)=>{   
    let email   = req.body.email;
    let pass    = req.body.password;

    User.findOne({"email": email})
        .then((user)=>{
            if(!user)
                return res.json({message: 'User not fount, outh failed', isAuth: false})    
            user.comparePassword(pass, (err, isMatch)=>{
                if(err) return next(err)
                if(isMatch)
                {
                    user.generateToken((err, user)=>{
                        if(err) {
                            return res.status(400).json({message:"Não autorizado", auth: false});
                        }
                        res.cookie('auth', user.token);
                        return res.json({message: "User is log in the system: ", auth: isMatch} )
                    })                   
                    
                }else{
                    return res.json({message: "Incorret pass", auth: isMatch} )
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