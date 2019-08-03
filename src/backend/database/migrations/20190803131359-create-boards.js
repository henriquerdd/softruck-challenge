'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('boards', {
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
        
        return queryInterface.dropTable('boards');
    }
};
