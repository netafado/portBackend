const express =  require('express');
const router    = express.Router();
const Financa = require('../models/financas');
const controller = require('../controller/financasController');
const auth = require('../auth/auth')


router.get('/', (req, res, next)=>{
    Financa.find()
            .then((data => res.json(data)))
});

// inserir nova Meta
router.post('/', controller.inserFinanca);


router.post('/', auth.authorized, upload.fields([{ name: 'img', maxCount: 1 }, { name: 'thumb', maxCount: 1 }]), controller.inserFinanca );

//inserir valor a uma meta
router.put('/:idFin/addValue', controller.insertValues);

module.exports = router