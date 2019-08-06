
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var BoardRespository = require('../repositories/boardsRepository');
var boardsResource = require('../resources/boardResource');

var boards = [
    {
        name: 'Board 1',
        description: 'First Board',
        uuid: 'fakeuuid1',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
    }
];

var expectedResult = boardsResource(boards[0]);

var sandbox;

describe('We can retrieve just one board', () => {
  
    before(() => {
        
        sandbox = sinon.createSandbox();

        sandbox.stub(Boards, 'findAll').returns(new Promise((resolve, reject) => {
            resolve(boards);
        }));
    });

    it('Gives us the desired board', (done) => {

        let boardsRepo = new BoardRespository(Boards);
        
        boardsRepo.find(boards[0].uuid)
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

