module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Class_Note', {}, {
        sequelize, modelName: 'Class_Note', timestamps: false
    })
};
