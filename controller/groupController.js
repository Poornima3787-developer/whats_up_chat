const { Group, GroupMember } = require('../models');

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const createdBy = req.user.userId;
    const group = await Group.create({ name, createdBy });
    await GroupMember.create({ groupId: group.id, userId: createdBy });
    res.status(201).json({ message: 'Group created', group });
  } catch (err) {
    res.status(500).json({ message: 'Error creating group', error: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const { groupId } = req.params;
    const isMember = await GroupMember.findOne({ where: { groupId, userId: req.user.userId } });
    if (!isMember) return res.status(403).json({ message: 'Unauthorized' });
    await GroupMember.create({ groupId, userId });
    res.status(200).json({ message: 'User added to group' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding member', error: err.message });
  }
};

exports.getUserGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: {
        model: GroupMember,
        where: { userId: req.user.userId },
        attributes: []
      }
    });
    res.status(200).json({ groups });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching groups', error: err.message });
  }
};
