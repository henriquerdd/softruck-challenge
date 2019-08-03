import React, { Component } from 'react';
import Display from '../utils/display';
import { Link } from 'react-router-dom';

function TaskUpdateInputs(props) {
    
    return (
        <div className="row">
            <div className="form-group col-sm-6">
                <label htmlFor="name"> Nome: </label>
                <input type="text" name="name" value={props.name} onChange={(e) => props.onInputChange("name", e.currentTarget.value)} className="form-control" />
            </div>
            <div className="form-group col-sm-6">
                <label htmlFor="status"> Estado: </label> <br />
                <select name="status" defaultValue={props.status} onChange={(e) => props.onInputChange("status", e.currentTarget.value)}>
                    {props.availableStatus.map((status) =>  <option value={status.value} key={status.value}>{status.display}</option>)}
                </select>
            </div>
            <div className="form-group col-sm-12">
                <label htmlFor="description">Descrição</label>
                <textarea name="description" rows="3" value={props.description} onChange={(e) => props.onInputChange("description", e.currentTarget.value)} className="form-control"></textarea>
            </div>
            <div className="form-group col-sm-12">
                <Link className="btn btn-default" to="/tasks">Voltar</Link>
                <button className="btn btn-primary" onClick={props.onSubmit}>Salvar</button>
            </div>
        </div>
    );
}

export default class TasksChanger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: null,
            showMessage: false,
            success: false,
            message: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
        const { match: { params } } = this.props;

        this.props.apiClient.getTask("/tasks/" + params.taskUuid)
        .then((result) => {
            this.setState({
                task: result.data 
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    updateTask(task) {

        this.props.apiClient.updateTask(task)
        .then((result) => {
            
            this.setState({
                task: result.data,
                showMessage: true,
                success: true,
                message: "Tarefa atualizada com sucesso!"
            });

            setTimeout(() => {
                this.props.history.push('/tasks');
            }, 1500);
        })
        .catch((err) => {
            
            this.setState({
                showMessage: true,
                success: false,
                message: "Ocorreu um erro ao tentar atualizar sua tarefa. Tente novamente mais tarde"
            });
            console.log(err);
        });
    }

    handleInputChange(name, value) {
        
        let task = this.state.task;

        task[name] = value;

        this.setState({
            task: task
        });
    }

    handleSubmit() {

        if (!this.state.task.name) {
            
            this.setState({
                showMessage: true,
                success: false,
                message: "O campo nome é obrigatório"
            });
        } else {
            this.updateTask(this.state.task);
        }
    }

    getAvailableStatus() {
        
        return [
            {
                value: 'PENDING',
                display: 'Pendente'
            },
            {
                value: 'ACCEPTED',
                display: 'Aceita'
            },
            {
                value: 'FINISHED',
                display: 'Terminada'
            }
        ];
    }

    render() {
        return (
            <div>
                {
                    this.state.task ?
                        <div>
                            <section className="content-header">
                                <h1 className="pull-left">Editando tarefa: {this.state.task.name}</h1>
                            </section>
                            <div className="content">
                                <div className="clearfix"></div>
                                <Display showMessage={this.state.showMessage} success={this.state.success} message={this.state.message} />
                                <div className="clearfix"></div>
                                <div className="box box-primary">
                                    <div className="box-body">
                                        <TaskUpdateInputs
                                            name={this.state.task.name}
                                            description={this.state.task.description}
                                            status={this.state.task.status}
                                            onInputChange={this.handleInputChange}
                                            onSubmit={this.handleSubmit}
                                            availableStatus={this.getAvailableStatus()}
                                        />    
                                    </div>
                                </div>
                            </div>
                        </div> :
                    null
                }                
            </div>
        );
    }
}