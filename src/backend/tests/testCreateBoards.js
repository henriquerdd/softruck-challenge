
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var BoardRespository = require('../repositories/boardsRepository');
var boardsResource = require('../resources/boardResource');

var board =  {
    name: 'Board 1',
    description: 'First Board',
    uuid: 'fakeuuid1',
    createdAt: '2019-01-01 00:00:00',
    updatedAt: '2019-01-01 00:00:00'
};

var expectedResult = boardsResource(board);

var sandbox;

describe('We can create boards', () => {
  
    before(() => {

        sandbox = sinon.createSandbox();

        sandbox.stub(Boards, 'create').withArgs({name: board.name, description: board.description}).returns(new Promise((resolve, reject) => {
            resolve(board);
        }));
    });

    it('Creates a new board', (done) => {

        let boardsRepo = new BoardRespository(Boards);
        
        boardsRepo.store({name: board.name, description: board.description})
            .then((result) => {
                assert(result, expectedResult);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    after(() => {
        sandbox.restore();
    });
});