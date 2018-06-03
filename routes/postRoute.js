const express = require ( 'express' );
const controller = require('../controller/postController');
const router = express.Router();
const auth = require('../auth/auth')
const multer = require('multer');


var storage =  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      // renomeia o arquivo para algo legivel
      let ext = file.mimetype.split('/')[1];
      console.log(ext);
      let filenewName  = file.fieldname + '-' + Date.now() +  "." + ext;
      cb(null, filenewName);
    }
  });

  upload = multer({ storage: storage });

router.get('/', controller.getAllPost );
router.get('/:id', controller.getOnePost );

router.post('/', auth.authorized, upload.fields([{ name: 'img', maxCount: 1 }, { name: 'thumb', maxCount: 1 }]), controller.insertPost );



router.delete('/:id', auth.authorized, controller.deleteOnePost );


module.exports = router;