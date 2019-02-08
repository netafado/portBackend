const express = require ( 'express' );
const userController = require( '../controller/userController' );
const router = express.Router();
const auth = require('../auth/auth')


// GET
router.get('/', userController.getUser);

// INSERIR
router.post('/', userController.insertUser);

// DELETE
router.post('/:id', userController.deleteUser);

router.post('/login', userController.userlogIn);
router.post('/profile',auth.authorized, userController.userProfile);

module.exports = router;