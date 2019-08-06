
let TasksRepository = require('../repositories/tasksRepository');

let { Boards } = require('../models');
let { Tasks } = require('../models');

let tasksRepo = new TasksRepository(Tasks, Boards);

exports.all = (req, res) => {

    tasksRepo.all()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({message: "Ocorreu um erro ao buscar suas tarefas"});
        });
};

exports.store = (req, res) => {

    tasksRepo.store(req.body)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({message: "Ocorreu um erro ao criar suas tarefas"});
        });
};

exports.find = (req, res) => {

    tasksRepo.find(req.params.taskUuid)
        .then((result) => {

            if (result == null) {
                res.status(404).send("Task not found");
            } else {
                res.send(result);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({message: "Ocorreu um erro ao encontrar sua tarefa"});
        });
};

exports.update = (req, res) => {

    tasksRepo.update(req.body, req.params.taskUuid)
    .then((result) => {

        if (result == null) {
            res.status(404).send("Task not found");
        } else {
            res.send(result);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send({message: "Ocorreu um erro ao atualizar sua tarefa"});
    });
};

exports.destroy = (req, res) => {

    tasksRepo.destroy(req.params.taskUuid)
    .then((result) => {

        if (result == null) {
            res.status(404).send("Task not found");
        } else {
            res.status(204).send('');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send({message: "Ocorreu um erro ao excluir sua tarefa"});
    });
};