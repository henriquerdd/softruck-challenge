
module.exports = (app) => {

    var boardsController = require('../controllers/boardsController')

    app.route('/api/boards')
        .get(boardsController.all)
        .post(boardsController.store);

    app.route('/api/boards/:boardUuid')
        .get(boardsController.find)
        .patch(boardsController.update)
        .delete(boardsController.destroy);

    app.route('/api/boards/:boardUuid/tasks')
        .get(boardsController.tasks);
    
    var tasksController = require('../controllers/tasksController')

    app.route('/api/tasks')
        .get(tasksController.all)
        .post(tasksController.store);

    app.route('/api/tasks/:taskUuid')
        .get(tasksController.find)
        .patch(tasksController.update)
        .delete(tasksController.destroy);
};