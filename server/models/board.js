'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.board.hasMany(models.comment,{
        foreignKey: 'boardId'
      });
      models.board.belongsTo(models.user);
    }
  }
  board.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'board',
  });
  return board;
};