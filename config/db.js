const express   = require('express');
const db        = require('mongoose');
db.Promise      = global.Promise;

db.connect("mongodb://site:edguy1@ds245548.mlab.com:45548/portifolio", { useNewUrlParser: true })
    .then(()=>{
        console.log("mongo connected")
    })
    .catch(err => console.log("err",err))


module.exports = db;