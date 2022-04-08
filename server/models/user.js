'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      models.user.hasMany(models.comment,{
        foreignKey: 'userId',
      });
      models.user.hasMany(models.board,{
=======
      models.user.hasMany(models.comment, {
        foreignKey: 'userId',
      });
      models.user.hasMany(models.board, {
>>>>>>> 8c0793a0b6dd9fb0945195af8f9e82aab2b9dde0
        foreignKey: 'userId',
      });
    }
  }
  user.init({
<<<<<<< HEAD
    role: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    postCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',

=======
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    postCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'user',
>>>>>>> 8c0793a0b6dd9fb0945195af8f9e82aab2b9dde0
  });
  return user;
};