const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Group = sequelize.define('Group', {
  name: { 
    type: DataTypes.STRING,
     allowNull: false
   },
  createdBy: {
     type: DataTypes.INTEGER,
      allowNull: false 
    }
});

module.exports = Group;