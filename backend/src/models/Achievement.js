const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Achievement extends Model {}

Achievement.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('streak', 'vocabulary', 'grammar', 'conversation'),
    allowNull: false
  },
  criteria: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  awarded_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Achievement',
  tableName: 'achievements'
});

module.exports = Achievement;