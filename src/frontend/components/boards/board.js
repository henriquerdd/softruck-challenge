import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TasksList from '../tasks/tasksList';
import Display from '../utils/display';

export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board: null,
            tasks: [],
            showMessage: false,
            message: "",
            success: false,
            newTask: {
                name: "",
                description: ""
            }
        };
        this.handleBoardDelete = this.handleBoardDelete.bind(this);
        this.handleTaskInputChange = this.handleTaskInputChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.fetchBoardData(params.boardUuid);
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params } } = nextProps;
        this.fetchBoardData(params.boardUuid);
    }

    fetchBoardData(boardUuid) {
        
        this.props.apiClient.getBoard("/boards/" + boardUuid)
            .then((result) => {

                this.setState({
                    board: result.data
                });

                return this.props.apiClient.getBoardTasks(result.data.self);
            })
            .then((result) => {

                this.setState({
                    tasks: result.data.slice()
                });
            })
            .catch((err) => {
                console.error(err);
                this.displayMessage("Ocorreu um erro ao buscar as tarefas do quadro");
            });
    }

    handleBoardDelete() {

        if (!this.state.board) {
            return;
        }

        this.props.apiClient.deleteBoard(this.state.board.self)
            .then((result) => {
                this.props.history.push("/");
            })
            .catch((err) => {
                console.error(err);
                this.displayMessage("Ocorreu um erro ao tentar excluir o quadro");
            });
    }

    handleTaskInputChange(name, value) {

        let newTask = {};
        newTask['name'] = this.state.newTask['name'];
        newTask['description'] = this.state.newTask['description'];
        newTask[name] = value;

        this.setState({
            newTask: newTask
        });
    }

    addTask() {

        if (!this.state.newTask.name) {
            this.displayMessage("O nome é obrigatório");
        }

        let newTask = this.state.newTask;

        this.props.apiClient.createTask({
            name: newTask.name,
            description: newTask.description,
            board: this.state.board.uuid
        })
        .then((result) => {
            
            let tasks = this.state.tasks.slice();
            tasks.push(result.data);

            this.setState({
                tasks: tasks,
                newTask: {
                    name: "",
                    description: ""
                }
            });
        })
        .catch((err) => {
            console.error(err);
            this.displayMessage("Ocorreu um erro ao criar sua tarefa");
        });
    }

    displayMessage(message, success=false, duration=2000) {
        
        this.setState({
            showMessage: true,
            message: message,
            success: success
        });

        setTimeout(() => {
            this.setState({
                showMessage: false
            });
        }, duration);
    }

    handleTaskDelete(taskReference) {

        this.props.apiClient.deleteTask(taskReference)
            .then((result) => {

                let tasks = this.state.tasks.slice().filter((task) => task.self != taskReference);

                this.setState({
                    tasks: tasks
                });
            })
            .catch((err) => {
                console.error(err);
                this.displayMessage("Ocorreu um erro ao excluir a tarefa");
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.board ? (
                        <div>
                            <section className="content-header">
                                <h1 className="pull-left" title={this.state.board.description}>
                                    <Link className="pull-left" to={`${this.state.board.self}/edit`}>{this.state.board.name}</Link>
                                </h1>
                                <h1 className="pull-right">
                                    <a href="#" className="btn btn-danger pull-right" style={{marginTop: -10, marginBottom: 5}} onClick={this.handleBoardDelete}>Delete</a>
                                </h1>
                            </section>
                            <div className="content">
                                <div className="clearfix"></div>
                                <Display showMessage={this.state.showMessage} success={this.state.success} message={this.state.message} />
                                <div className="clearfix"></div>
                                <div className="box box-primary">
                                    <div className="box-body">
                                        <h2> Nova tarefa: </h2>
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <label htmlFor="newTaskName">Nome:</label><br />
                                                <input value={this.state.newTask.name} type="text" name="newTaskName" className="form-control" onChange={(e) => this.handleTaskInputChange("name", e.currentTarget.value)} /> 
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="newTaskDescription">Nome:</label><br />
                                                <textarea value={this.state.newTask.description} name="newTaskDescription" className="form-control" rows="3" onChange={(e) => this.handleTaskInputChange("description", e.currentTarget.value)}></textarea>
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <br />
                                                <button className="btn btn-primary" onClick={this.addTask}>Adicionar</button>
                                            </div>
                                        </div>
                                        
                                        <h2>Tarefas do quadro</h2>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <br />
                                                <TasksList apiClient={this.props.apiClient} tasks={this.state.tasks} onTaskDelete={this.handleTaskDelete} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ): null
                }
            </div>
        )
    }
}