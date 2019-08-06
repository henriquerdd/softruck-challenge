
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var BoardRespository = require('../repositories/boardsRepository');
var boardsResource = require('../resources/boardResource');

var boards =  [
    {
        name: 'Board 1',
        description: 'First Board',
        uuid: 'fakeuuid1',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
    }
];

let newName = 'Board 2';

var expectedResult = boardsResource({
    name: newName,
    description: boards[0].description,
    uuid: boards[0].uuid,
    createdAt: boards[0].createdAt,
    updatedAt: boards[0].updatedAt
});

var sandbox;

describe('We can update boards', () => {
  
    before(() => {

        sandbox = sinon.createSandbox();

        boards[0].save = () => {
            return new Promise((resolve, reject) => {
                resolve(boards[0]);
            });
        };

        sandbox.stub(Boards, 'findAll').returns(new Promise((resolve, reject) => {
            resolve(boards);
        }));
    });

    it('Updates the selected board', (done) => {

        let boardsRepo = new BoardRespository(Boards);
        
        boardsRepo.update({name: newName}, boards[0].uuid)
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