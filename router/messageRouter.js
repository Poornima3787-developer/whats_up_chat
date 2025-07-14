const express=require('express');
const router=express.Router();

const messageController=require('../controller/messageController');
const authenticate=require('../middleware/authenticate');

router.post('/',authenticate,messageController.sendMessage);
router.get('/:receiverId',authenticate,messageController.getMessages);

module.exports=router;