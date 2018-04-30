const express = require ( 'express' );
const userController = require( '../controller/userController' );
const router = express.Router();
const auth = require('../auth/auth')

router.get('/', userController.getUser)
router.post('/', userController.insertUser);

router.post('/login', userController.userlogIn);
router.post('/profile',auth.authorized, userController.userProfile);

module.exports = router;