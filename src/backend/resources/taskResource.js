
module.exports = (task) => {
    
    return {
        name: task.name,
        description: task.description,
        status: task.status,
        uuid: task.uuid,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        self: "/tasks/" + task.uuid,
        board: "/boards/" + task.board.uuid
    };
};