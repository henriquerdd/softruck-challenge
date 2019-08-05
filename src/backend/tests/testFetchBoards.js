
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var BoardRespository = require('../repositories/boardsRepository');
var boardsResource = require('../resources/boardResource');

var boards = [
    {
        name: 'Board 1',
        description: 'First Board',
        uuid: 'fakuuid1'
    },
    {
        name: 'Board 2',
        description: 'Second Board',
        uuid: 'fakuuid2'
    },
    {
        name: 'Board 3',
        description: 'Third Board',
        uuid: 'fakuuid3'
    }
];

var expectedResult = boards.map((board) => boardsResource(board));  

describe('We can retrieve boards', () => {
  
    before(() => {
        sinon.stub(Boards, 'findAll').returns(new Promise((resolve, reject) => {
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
});