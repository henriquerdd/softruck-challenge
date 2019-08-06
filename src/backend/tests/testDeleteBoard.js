
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var BoardRespository = require('../repositories/boardsRepository');

var expectedResult = 1;

var sandbox;

describe('We can delete boards', () => {
  
    before(() => {

        sandbox = sinon.createSandbox();

        sandbox.stub(Boards, 'destroy').returns(new Promise((resolve, reject) => {
            resolve(1);
        }));
    });

    it('It deletes the given board', (done) => {

        let boardsRepo = new BoardRespository(Boards);
        
        boardsRepo.destroy('fakeUuid1')
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