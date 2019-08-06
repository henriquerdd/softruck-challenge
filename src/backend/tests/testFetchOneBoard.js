
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
    },
    {
        name: 'Board 2',
        description: 'Second Board',
        uuid: 'fakeuuid2',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
    },
    {
        name: 'Board 3',
        description: 'Third Board',
        uuid: 'fakeuuid3',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
    }
];

var expectedResult = boards.map((board) => boardsResource(board));  

var sandbox;

describe('We can retrieve boards', () => {
  
    before(() => {
        
        sandbox = sinon.createSandbox();

        sandbox.stub(Boards, 'findAll').returns(new Promise((resolve, reject) => {
            resolve(boards);
        }));
    });

    it('Gives us all of it\'s boards', (done) => {

        let boardsRepo = new BoardRespository(Boards);
        
        boardsRepo.all()
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