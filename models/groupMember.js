const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const GroupMember = sequelize.define('GroupMember', {
  groupId: { 
    type: DataTypes.INTEGER,
     allowNull: false 
    },
  userId: { 
    type: DataTypes.INTEGER,
     allowNull: false 
    }
});

module.exports = GroupMember;