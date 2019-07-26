import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

const datatableColumns = [
    {
        label: 'Ações',
        field: 'actions',
        width: 100,
    },
    {
        label: 'Nome',
        field: 'name',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Estado',
        field: 'status',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Criado Em',
        field: 'createdAt',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Atualizado Em',
        field: 'updatedAt',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Descrição',
        field: 'description',
        sort: 'asc',
        width: 300
    }
];

export default class TasksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            columns: datatableColumns,
            rows: []
        };
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount() {
    
        this.props.apiClient.getAllTasks()
            .then((result) => {
                this.setState({
                    tasks: result.data,
                    rows: this.makeRows(result.data)
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    formatStatusColumn(status) {
    
        let color, icon, text;
    
        switch (status) {
            case 'PENDING':
                color = 'text-red';
                icon = 'fa fa-square-o';
                text = " Pendente";
            break;
            case 'ACCEPTED':
                color = 'text-blue';
                icon = 'fa fa-dot-circle-o';
                text = " Aceita";
            break;
            case 'FINISHED':
                color = 'text-green';
                icon = 'fa fa-check-square-o';
                text = " Terminada";
            break;
        }
    
        return (
            <span className={color}><i className={icon}></i>{text}</span>
        );
    }
    
    formatDate(dateString) {
    
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        };
    
        return new Intl.DateTimeFormat('pt-BR', options).format(Date.parse(dateString));
    }

    deleteTask(taskReference) {

        this.props.apiClient.deleteTask(taskReference)
        .then((result) => {

            let tasks = this.state.tasks.filter((task) => task['self'] != taskReference);

            this.setState({
                tasks: tasks,
                rows: this.makeRows(tasks)
            })
        })
        .catch((err) => {
            console.error(err);
        });
    }

    getAvailableActions(task) {

        return (
            <div className="btn-group">
                <Link className="btn btn-default" to={task['self']}><i className="fa fa-edit"></i></Link>
                <button className="btn btn-danger" onClick={(e) => this.deleteTask(task['self'])}><i className="fa fa-trash"></i></button>
            </div>
        );
    }

    makeRows(tasks) {

        return tasks.map((task) => {

            return {
                actions: this.getAvailableActions(task),
                name: task['name'],
                status: this.formatStatusColumn(task['status']),
                createdAt: this.formatDate(task['createdAt']),
                updatedAt: this.formatDate(task['updatedAt']),
                description: task['description']
            };
        });
    }

    render() {
        return (
            <div>
                <section className="content-header">
                    <h1 className="pull-left">Tarefas</h1>
                    <h1 className="pull-right">
                        <Link className="btn btn-primary pull-right" style={{marginTop: -10, marginBottom: 5}} to="/tasks/create" >Nova</Link>
                    </h1>
                </section>
                <div className="content">
                    <div className="clearfix"></div>
                    <div className="box box-primary">
                        <div className="box-body">
                            <MDBDataTable
                                striped
                                bordered
                                hover
                                responsive
                                data={{columns: this.state.columns, rows: this.state.rows}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// if (document.getElementById('tasks_list')) {
    
//     let apiClient = new ApiClient();

//     apiClient.getAllTasks()
//     .then((result) => {
//         ReactDOM.render(<TasksList tasks={result.data} apiClient={apiClient} />, document.getElementById('tasks_list'));
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// }