'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
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