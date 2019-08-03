
import BoardsRepository from '../repositories/boardsRepository';

let boardsRepo = new BoardsRepository();

exports.all = (req, res) => {
    boardsRepo.all(res);
};

exports.store = (req, res) => {
    res.send(boardsRepo.store(req.body));
};

exports.find = (req, res) => {
    let uuid = req.params.uuid;
    boardsRepo.find(uuid, res);
};

exports.update = (req, res) => {
    let uuid = req.params.uuid;
    boardsRepo.update(uuid, req.body, res);
};

exports.destroy = (req, res) => {
    let uuid = req.params.uuid;
    boardsRepo.destroy(uuid, res);
};