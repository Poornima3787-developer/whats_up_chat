const {Sequelize,DataTypes}=require('sequelize');
const sequelize = require('../utils/db-connection');

const Message=sequelize.define('Message',{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    unique:true,
  },
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

moduls.exports=Message;