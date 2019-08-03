
let boardsRepo = require('../repositories/boardsRepository');

exports.all = (req, res) => {

    boardsRepo.all()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({message: "Ocorreu um erro ao buscar seus quadros"});
        });
};

exports.store = (req, res) => {

    boardsRepo.store(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({message: "Ocorreu um erro ao criar seus quadros"});
        });
};

exports.find = (req, res) => {

    boardsRepo.find(req.params.boardUuid)
        .then((result) => {

            if (result == null) {
                res.status(404).send("Board not found");
            } else {
                res.send(result);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({message: "Ocorreu um erro ao encontrar seu quadro"});
        });
};