module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Step', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Post',
                key: 'id',
            },
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
        },
        image_url: {
            type: DataTypes.STRING,
        },
    });
};
