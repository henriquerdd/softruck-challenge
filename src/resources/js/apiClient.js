


export default class ApiClient {

    constructor(baseUrl, headers) {
        this.httpClient = axios.create({
            baseUrl: baseUrl,
            timeout: 3000,
            headers: headers
        });
    }

    createTask(task) {
        return this.httpClient.post('/api/tasks', task);
    }

    getAllTasks() {
        return this.httpClient.get('/api/tasks');
    }
}