module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Criteria', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:  /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
            }
        },
        percentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
    }, {
        sequelize, modelName: 'Criteria', timestamps: false
    })
};
