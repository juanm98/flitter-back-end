'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }
    Comment.init(
        {
            content: { type: DataTypes.TEXT, allowNull: false },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Posts',
                    key: 'id',
                },
            },
        },

        {
            sequelize,
            modelName: 'Comment',
        }
    );
    return Comment;
};