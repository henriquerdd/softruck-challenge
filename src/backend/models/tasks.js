
module.exports = (sequelize, DataTypes) => {

    const Tasks = sequelize.define('Tasks', {
        
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'FINISHED'),
            defaultValue: 'PENDING'
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        boardId: DataTypes.INTEGER
    }, {
        tableName: 'tasks'
    });

    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Boards, {foreignKey: 'boardId', as: 'board'});
    };

    return Tasks;
};