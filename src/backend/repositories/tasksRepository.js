
var { Tasks } = require('../models');
var { Boards } = require('../models');

const taskResource = require('../resources/taskResource');

exports.all = () => {
    
    return new Promise((resolve, reject) => {

        Tasks.findAll({include: 'board'})
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
};

exports.store = (task) => {

    return new Promise((resolve, reject) => {

        Tasks.create({
            name: task.name,
            description: task.description,
            status: task.status,
            boardId: task.boardId
        })
        .then((task) => {

            return new Promise((resolve, reject) => {
                
                Boards.findByPk(task.boardId)
                    .then((board) => {
                        task['board'] = board;
                        resolve(task);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        })
        .then((task) => {
            resolve(taskResource(task));
        })
        .catch((err) => {
            reject(err);
        });
    });
};

exports.find = (taskUuid) => {

    return new Promise((resolve, reject) => {

        Tasks.findAll({
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
};

exports.update = (data, taskUuid) => {
    
    return new Promise((resolve, reject) => {

        Tasks.update(data, {
            where: {
                uuid: taskUuid
            }
        })
        .then((result) => {
            
            return Tasks.findAll({
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

                resolve(
                    taskResource(tasks[0])
                );
            }
        })
        .catch((err) => {
            reject(err);
        });
    });
};

exports.destroy = (taskUuid) => {

    return new Promise((resolve, reject) => {

        Tasks.destroy({
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
};