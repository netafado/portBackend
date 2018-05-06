const express = require ( 'express' );
const controller = require('../controller/postController');
const router = express.Router();
const auth = require('../auth/auth')

router.get('/', controller.getAllPost );
router.get('/:id', controller.getOnePost );

router.post('/', auth.authorized, controller.insertPost );



router.delete('/:id', auth.authorized, controller.deleteOnePost );


module.exports = router;