
const boardResource = require('../resources/boardResource');
const taskResource = require('../resources/taskResource');

module.exports = class BoardsRepository {

    constructor(model) {
        this.model = model;
    }

    all() {
    
        return new Promise((resolve, reject) => {
    
            this.model.findAll()
                .then((boards) => {
    
                    let resources = boards.map((board) => {
                        return boardResource(board);
                    });
    
                    resolve(resources);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    store(board) {

        return new Promise((resolve, reject) => {
    
            this.model.create({
                name: board.name,
                description: board.description
            })
            .then((board) => {
                resolve(boardResource(board));
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    find(boardUuid) {

        return new Promise((resolve, reject) => {
    
            this.model.findAll({
                where: {
                    uuid: boardUuid
                }
            })
            .then((boards) => {
    
                if (boards.length == 0) {
                    resolve(null);
                } else {
                    resolve(boardResource(boards[0]));
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    update(data, boardUuid) {
    
        return new Promise((resolve, reject) => {
    
            this.model.findAll({
                where: {
                    uuid: boardUuid
                }
            })
            .then((boards) => {
                
                if (boards.length == 0) {
                    resolve(null);
                } else {
    
                    let board = boards[0];
    
                    for(key in data) {
                        board[key] = data[key];
                    }
    
                    return board.save();
                }
            })
            .then((result) => {
                
                resolve(
                    boardResource(result)
                );
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    destroy(boardUuid) {

        return new Promise((resolve, reject) => {
    
            this.model.destroy({
                where: {
                    uuid: boardUuid
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

    tasks(boardUuid) {

        return new Promise((resolve, reject) => {
    
            this.model.findAll({
                where: {
                    uuid: boardUuid
                },
                include: 'tasks'
            })
            .then((boards) => {
                
                if (boards.length == 0) {
                    resolve(null);
                } else {
    
                    let board = boards[0];
    
                    let tasks = board['tasks']
                        .map((task) => {
                            
                            task['board'] = {
                                uuid: boardUuid
                            }
    
                            return task;
                        })
                        .map((task) => taskResource(task));
    
                    resolve(tasks);
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
