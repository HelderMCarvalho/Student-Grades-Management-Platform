module.exports = function (sequelize, DataTypes) {
    return sequelize.define('EvaluationComponent', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        grade: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
    }, {
        sequelize, modelName: 'EvaluationComponent', timestamps: false
    })
};
