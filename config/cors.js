const express =  require('express');

exports.cors = (req, res, next)=>{
    var allowedOrigins = ['http://localhost:3000', 'https://isaiasfrancisco.com.br/', 'https://isaiasfrancisco.com.br/'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();    
}
