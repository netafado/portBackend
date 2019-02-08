const express = require ( 'express' );
const userController = require( '../controller/userController' );
const router = express.Router();
const auth = require('../auth/auth')

// GET
router.get('/', auth.authorized, userController.getUser)
router.get('/auth',auth.authorized ,userController.userAuth)

// POST
router.post('/', userController.insertUser);
router.post('/login', userController.userlogIn);
router.post('/profile',auth.authorized, userController.userProfile);

//DELETE
router.delete('/delete/:id', auth.authorized,userController.deleteUser)

module.exports = router;