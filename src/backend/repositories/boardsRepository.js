
var { Boards } = require('../models');

const boardResource = require('../resources/boardResource');

exports.all = () => {
    
    return new Promise((resolve, reject) => {

        Boards.findAll()
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
};

exports.store = (board) => {

    return new Promise((resolve, reject) => {

        Boards.create({
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
};

exports.find = (boardUuid) => {

    return new Promise((resolve, reject) => {

        Boards.findAll({
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
};