
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

let newName = 'Novo nome';
var expectedResult =  tasks.map((task) => taskResource(task))[0];
expectedResult['name'] = newName;

var sandbox;

describe('We can update a task', () => {
  
    before(() => {
        
        sandbox = sinon.createSandbox();

        sandbox.stub(Boards, 'findByPk').returns(new Promise((resolve, reject) => {
            resolve([tasks[0]['board']]);
        }));

        sandbox.stub(Tasks, 'update').returns(new Promise((resolve, reject) => {
            tasks[0]['name'] = newName;
            resolve(tasks[0])
        }));
    });

    it('Returns the updated task', (done) => {

        let tasksRepo = new TasksRepository(Tasks, Boards);
        
        tasksRepo.update({name: newName}, tasks[0].uuid)
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