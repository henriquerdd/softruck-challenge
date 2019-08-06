
const taskResource = require('../resources/taskResource');

module.exports = class TasksRepository {

    constructor(tasksModel, boardsModel) {
        this.tasksModel = tasksModel;
        this.boardsModel = boardsModel;
    }

    all() {
    
        return new Promise((resolve, reject) => {
    
            this.tasksModel.findAll({include: 'board'})
                .then((tasks) => {
    
                    let resources = tasks.map((task) => {
                        return taskResource(task);
                    });
    
                    resolve(resources);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    
    store(task) {

        var board;
    
        return new Promise((resolve, reject) => {
    
            this.boardsModel.findAll({
                where: {
                    uuid: task.board
                }
            })
            .then((result) => {
    
                if (result.length == 0) {
                    throw "Board not found";
                }
    
                board = result[0];
    
                return this.tasksModel.create({
                    name: task.name,
                    description: task.description,
                    boardId: board.id
                });
            })
            .then((task) => {
                task['board'] = board;
                resolve(taskResource(task));
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    find(taskUuid) {

        return new Promise((resolve, reject) => {
    
            this.tasksModel.findAll({
                where: {
                    uuid: taskUuid
                },
                include: 'board'
            })
            .then((tasks) => {
                
                if (tasks.length == 0) {
                    resolve(null);
                } else {
                    resolve(taskResource(tasks[0]));
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    update(data, taskUuid) {
    
        return new Promise((resolve, reject) => {
    
            this.tasksModel.update(data, {
                where: {
                    uuid: taskUuid
                }
            })
            .then((result) => {

                return this.tasksModel.findAll({
                    where: {
                        uuid: taskUuid
                    },
                    include: 'board'
                });
            })
            .then((tasks) => {

                if (tasks.length == 0) {
                    resolve(null);
                } else {
                    resolve(taskResource(tasks[0]));
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    destroy(taskUuid) {

        return new Promise((resolve, reject) => {
    
            this.tasksModel.destroy({
                where: {
                    uuid: taskUuid
                }
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
