const express =  require('express');
const router    = express.Router();
const Financa = require('../models/financas');

router.get('/', (req, res, next)=>{
    Financa.find()
            .then((data => res.json(data)))
});

router.post('/', (req, res, next)=>{
    console.log("post");
    res.send("get");
});

router.post('/:id', (req, res, next)=>{
    console.log("post");
    res.send("get");;
});

module.exports = router