module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Student', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:  /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:  /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
            }
        },
        code: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        photo_blob: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize, modelName: 'Student', timestamps: false
    })
};
