module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Note_Student_Class', {}, {
        sequelize, modelName: 'Note_Student_Class', timestamps: false
    })
};
