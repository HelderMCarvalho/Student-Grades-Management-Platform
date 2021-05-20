module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Class', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        lective_year: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize, modelName: 'Class', timestamps: false
    })
};
