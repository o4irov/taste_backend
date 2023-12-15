export default function (sequelize, DataTypes) {
    return sequelize.define('UserPost', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Post',
                key: 'id',
            },
        },
    });
};
