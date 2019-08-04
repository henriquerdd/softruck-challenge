
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

    var board;

    return new Promise((resolve, reject) => {

        Boards.findAll({
            where: {
                uuid: task.board
            }
        })
        .then((result) => {

            if (result.length == 0) {
                throw "Board not found";
            }

            board = result[0];

            return Tasks.create({
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