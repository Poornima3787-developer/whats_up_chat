const { GroupMessage, GroupMember } = require('../models');

exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { groupId } = req.params;
    const senderId = req.user.userId;
    const isMember = await GroupMember.findOne({ where: { groupId, userId: senderId } });
    if (!isMember) return res.status(403).json({ message: 'Not a group member' });
    const message = await GroupMessage.create({ groupId, senderId, content });
    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Error sending message', error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;
    const isMember = await GroupMember.findOne({ where: { groupId, userId } });
    if (!isMember) return res.status(403).json({ message: 'Not a group member' });
    const messages = await GroupMessage.findAll({ where: { groupId }, order: [['createdAt', 'ASC']] });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Error loading messages', error: err.message });
  }
};