const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Tutor extends Model {}

Tutor.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  personality: {
    type: DataTypes.ENUM('friendly', 'strict', 'patient', 'humorous'),
    defaultValue: 'friendly'
  },
  teachingStyle: {
    type: DataTypes.ENUM('conversational', 'structured', 'immersive'),
    defaultValue: 'conversational'
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Tutor'
});

module.exports = Tutor;