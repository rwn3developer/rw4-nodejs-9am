const express = require('express');

const routes = express.Router();

const usercontroller = require('../controllers/UserController');

const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix) 
//     }
//   })
//   const uploadImage = multer({ storage: storage }).single('image');


  const multipleFile = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix) 
    }
  })
  const multipleuploadImage = multer({ storage: multipleFile }).array('images',10);

routes.get('/',usercontroller.index);
routes.get('/add',usercontroller.add);
routes.post('/addRecord',multipleuploadImage,usercontroller.addRecord);
routes.get('/deleteUser',usercontroller.deleteUser);
routes.get('/editUser',usercontroller.editUser);
routes.post('/updateRecord',multipleuploadImage,usercontroller.updateRecord);


module.exports = routes;