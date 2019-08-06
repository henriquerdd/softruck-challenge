
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
            id: 1,
            uuid: 'fakeboarduuid1'
        }
    }
];

var expectedResult =  tasks.map((task) => taskResource(task))[0];

var sandbox;

describe('We can create a task', () => {
  
    before(() => {
        
        sandbox = sinon.createSandbox();

        sandbox.stub(Boards, 'findAll').returns(new Promise((resolve, reject) => {
            resolve([tasks[0]['board']]);
        }));

        sandbox.stub(Tasks, 'create').returns(new Promise((resolve, reject) => {
            resolve(tasks[0])
        }));
    });

    it('Returns the new task', (done) => {

        let tasksRepo = new TasksRepository(Tasks, Boards);
        
        tasksRepo.store({name: 'Task1 1', description: 'First task', board: 'fakeboarduuid1'})
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