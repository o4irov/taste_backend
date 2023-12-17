module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 1,
        },
        title_image_url: {
            type: DataTypes.STRING,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
        },
        portion: {
            type: DataTypes.INTEGER,
        },
    });
};
