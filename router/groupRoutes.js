const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const groupMessageController = require('../controllers/groupMessageController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, groupController.createGroup);
router.post('/:groupId/add-member', authenticate, groupController.addMember);
router.get('/', authenticate, groupController.getUserGroups);
router.post('/:groupId/message', authenticate, groupMessageController.sendMessage);
router.get('/:groupId/messages', authenticate, groupMessageController.getMessages);

module.exports = router;