
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var { Tasks } = require('../models');

var TasksRepository = require('../repositories/tasksRepository');
var taskResource = require('../resources/taskResource');

var tasks = [
    {
        name: 'Task1 1',
        description: 'First task',
        uuid: 'fakeuuid1',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00',
        state: 'PENDING',
        boardId: 1,
        board: {
            uuid: 'fakeboarduuid1'
        }
    }
];

var expectedResult =  tasks.map((task) => taskResource(task))[0];

var sandbox;

describe('We can retrieve just one task', () => {
  
    before(() => {
        
        sandbox = sinon.createSandbox();

        sandbox.stub(Tasks, 'findAll').returns(new Promise((resolve, reject) => {
            resolve(tasks);
        }));
    });

    it('Gives us all of it\'s tasks', (done) => {

        let tasksRepo = new TasksRepository(Tasks, Boards);
        
        tasksRepo.find(tasks[0].uuid)
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