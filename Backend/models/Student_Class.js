module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Student_Class', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        }
    }, {
        sequelize, modelName: 'Student_Class', timestamps: false
    })
};
