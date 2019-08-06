
module.exports = (sequelize, DataTypes) => {

    const Boards = sequelize.define('Boards', {
        
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        }
    }, {
        tableName: 'boards'
    });

    Boards.associate = (models) => {
        Boards.hasMany(models.Tasks, {as: 'tasks'});
    };

    return Boards;
};