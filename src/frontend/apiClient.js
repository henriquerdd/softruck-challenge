
const API_BASE_URL = 'http://localhost:3000';

var axios = require('axios');

export default class ApiClient {
    
    constructor() {
        this.httpClient = axios.create({
            baseUrl: API_BASE_URL,
            timeout: 5000
        });
    }

    getAllTasks() {
        return this.httpClient.get('/api/tasks');
    }

    getTask(taskReference) {
        return this.httpClient.get('/api' + taskReference);
    }

    createTask(task) {
        return this.httpClient.post('/api/tasks', task);
    }

    updateTask(task) {
        return this.httpClient.patch('/api' + task['self'], task);
    }

    deleteTask(taskReference) {
        return this.httpClient.delete('/api' + taskReference);
    }

    getAllBoards() {
        return this.httpClient.get('/api/boards');
    }

    getBoard(boardRefence) {
        return this.httpClient.get('/api' + boardRefence);
    }

    createBoard(board) {
        return this.httpClient.post('/api/boards', board);
    }

    updateBoard(board) {
        return this.httpClient.patch('/api' + board['self'], board);
    }

    deleteBoard(boardRefence) {
        return this.httpClient.delete('/api' + boardRefence);
    }

    getBoardTasks(boardRefence) {
        return this.httpClient.get('/api' + boardRefence + '/tasks');
    }
}