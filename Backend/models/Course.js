module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Course', {
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
        }
    }, {
        sequelize, modelName: 'Course', timestamps: false
    })
};
