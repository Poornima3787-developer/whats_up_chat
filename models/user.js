const {Sequelize,DataTypes}=require('sequelize');
const sequelize = require('../utils/db-connection');

const User=sequelize.define('User',{
  id:{
    type:DataTypes.NUMBER,
    autoIncrement:true,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  phoneNumber:{
    type:DataTypes.NUMBER,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

module.exports=User;