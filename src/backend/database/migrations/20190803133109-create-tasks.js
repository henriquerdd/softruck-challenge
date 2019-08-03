'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        
        return queryInterface.createTable('tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(100),
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('PENDING', 'ACCEPTED', 'FINISHED'),
                defaultValue: 'PENDING'
            },
            boardId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'boards',
                    key: 'id'
                },
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        
        return queryInterface.dropTable('tasks');
    }
};