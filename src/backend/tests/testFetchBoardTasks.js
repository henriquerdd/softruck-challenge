
var sinon = require('sinon');
var assert = require('chai').assert;

var { Boards } = require('../models');
var BoardRespository = require('../repositories/boardsRepository');
var taskResource = require('../resources/taskResource');

var boards = [
    {
        id: 1,
        name: 'Board 1',
        description: 'First Board',
        uuid: 'fakeuuid1',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00',
        tasks: [
            {
                id: 1,
                name: 'Task 1',
                description: 'The first task ever created',
                uuid: 'faketaskuuid1',
                createdAt: '2019-01-01 00:00:00',
                updatedAt: '2019-01-01 00:00:00',
                state: 'FINISHED',
                boardId: 1
            },
            {
                id: 23,
                name: 'Task 23',
                description: 'Just another task',
                uuid: 'faketaskuuid23',
                createdAt: '2019-01-01 00:00:00',
                updatedAt: '2019-01-01 00:00:00',
                state: 'ACCEPTED',
                boardId: 1
            },
            {
                id: 7865,
                name: 'Task 7685',
                description: 'Oh God why?',
                uuid: 'faketaskuuid7685',
                createdAt: '2019-01-01 00:00:00',
                updatedAt: '2019-01-01 00:00:00',
                state: 'PENDING',
                boardId: 1
            }
        ]
    }
];

var expectedResult = boards[0]['tasks'].map((task) => {
    task['board'] = boards[0].uuid;
    return taskResource(task);
});

var sandbox;

describe('We can retrieve all tasks for a given board', () => {
  
    before(() => {
        
        sandbox = sinon.createSandbox();

        sandbox.stub(Boards, 'findAll').returns(new Promise((resolve, reject) => {
            resolve(boards);
        }));
    });

    it('Gives us all of it\'s tasks', (done) => {

        let boardsRepo = new BoardRespository(Boards);
        
        boardsRepo.tasks(boards[0].uuid)
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