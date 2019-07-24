import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import ReactDOM from 'react-dom';
import ApiClient from '../../apiClient';

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

function formatStatusColumn(status) {
    
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

function formatDate(dateString) {

    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
    };

    return new Intl.DateTimeFormat('pt-BR', options).format(Date.parse(dateString));
}

export default class TasksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
            columns: datatableColumns,
            rows: this.makeRows(props.tasks)
        };
        this.deleteTask = this.deleteTask.bind(this);
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

    getAvailableActions(row) {

        return (
            <div className="btn-group">
                <a className="btn btn-default" href={`${row['self']}/edit`}><i className="fa fa-edit"></i></a>
                <button className="btn btn-danger" onClick={(e) => this.deleteTask(row['self'])}><i className="fa fa-trash"></i></button>
            </div>
        );
    }

    makeRows(tasks) {

        return tasks.map((task) => {

            return {
                actions: this.getAvailableActions(task),
                name: task['name'],
                status: formatStatusColumn(task['status']),
                createdAt: formatDate(task['createdAt']),
                updatedAt: formatDate(task['updatedAt']),
                description: task['description']
            };
        });
    }

    render() {
        return (
            <div>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    responsive
                    data={{columns: this.state.columns, rows: this.state.rows}}
                />
            </div>
        );
    }
}

if (document.getElementById('tasks_list')) {
    
    let apiClient = new ApiClient();

    apiClient.getAllTasks()
    .then((result) => {
        ReactDOM.render(<TasksList tasks={result.data} apiClient={apiClient} />, document.getElementById('tasks_list'));
    })
    .catch((err) => {
        console.log(err);
    });
}