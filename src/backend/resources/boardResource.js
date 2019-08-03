
module.exports = (board) => {
    
    return {
        name: board.name,
        description: board.description,
        uuid: board.uuid,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
        self: "/boards/" + board.uuid
    };
};