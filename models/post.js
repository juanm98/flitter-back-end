'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, {foreignKey: 'posterId'})
      Post.belongsTo(models.Profile, {foreignKey: 'profileId'})
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      required: true
    },
    text: {
      type: DataTypes.STRING
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id'
      }
    },
    voterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};