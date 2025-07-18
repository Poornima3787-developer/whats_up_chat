const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const authenticate=require('../middleware/authenticate');

router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/all-users',authenticate,userController.getAllUsers);

module.exports=router;