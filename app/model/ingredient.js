export default function (sequelize, DataTypes) {
    return sequelize.define('Ingredient', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Post',
                key: 'id',
            },
        },
        measurement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'MeasurmentType',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
