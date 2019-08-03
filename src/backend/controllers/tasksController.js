
import TasksRepository from '../repositories/tasksRepository';

let tasksRepo = new TasksRepository();

exports.all = (req, res) => {
    return res.send(tasksRepo.all(req));
};

exports.store = (req, res) => {
    res.send(tasksRepo.store(req));
};

exports.find = (req, res) => {
    let uuid = req.params.uuid;
    res.send(tasksRepo.find(uuid, req))
};

exports.update = (req, res) => {
    let uuid = req.params.uuid;
    res.send(tasksRepo.update(uuid, req))
};

exports.destroy = (req, res) => {
    let uuid = req.params.uuid;
    res.send(tasksRepo.destroy(uuid, req))
};