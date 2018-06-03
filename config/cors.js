const express =  require('express');

exports.cors = (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "https://isaiasfrancisco.com.br/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();    
}


