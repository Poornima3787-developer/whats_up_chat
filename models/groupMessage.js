const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const GroupMessage = sequelize.define('GroupMessage', 
  {
  groupId: { 
    type: DataTypes.INTEGER,
     allowNull: false
     },
  senderId: {
     type: DataTypes.INTEGER,
      allowNull: false 
    },
  content: { 
    type: DataTypes.TEXT,
     allowNull: false
     }
});

module.exports = GroupMessage;
