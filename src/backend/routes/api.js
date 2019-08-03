
module.exports = (app) => {

    var boardsController = require('../controllers/boardsController')

    app.route('/api/boards')
        .get(boardsController.all)
        .post(boardsController.store);

    app.route('/api/boards/:boardUuid')
        .get(boardsController.find)
        .patch(boardsController.update)
        .delete(boardsController.destroy);
};