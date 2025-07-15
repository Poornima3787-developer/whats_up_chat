const {Sequelize,DataTypes}=require('sequelize');
const sequelize = require('../utils/db-connection');

const Message=sequelize.define('Message',{
  content:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  senderId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  receiverId:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
});

module.exports=Message;