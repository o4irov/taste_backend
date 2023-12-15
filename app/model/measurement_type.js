export default function (sequelize, DataTypes) {
    return sequelize.define('MeasurmentType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        small_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
