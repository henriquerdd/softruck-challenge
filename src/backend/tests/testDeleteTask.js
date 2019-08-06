
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var { Tasks } = require('../models');

var TasksRepository = require('../repositories/tasksRepository');

var expectedResult =  1;

var sandbox;

describe('We can delete a task', () => {
  
    before(() => {
        
        sandbox = sinon.createSandbox();

        sandbox.stub(Tasks, 'destroy').returns(new Promise((resolve, reject) => {
            resolve(1);
        }));
    });

    it('Removes the task', (done) => {

        let tasksRepo = new TasksRepository(Tasks, Boards);
        
        tasksRepo.destroy('taskuuid1')
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