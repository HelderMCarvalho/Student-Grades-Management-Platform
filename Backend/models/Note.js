module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Note', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize, modelName: 'Note', timestamps: false
    })
};
