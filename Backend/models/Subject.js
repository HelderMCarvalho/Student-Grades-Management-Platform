module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Subject', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:  /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
            }
        }
    }, {
        sequelize, modelName: 'Subject', timestamps: false
    })
};
