export default function (sequelize, DataTypes) {
    return sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
