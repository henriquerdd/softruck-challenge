import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class TasksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ tasks: nextProps.tasks });  
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

    getAvailableActions(task) {

        return (
            <div className="btn-group">
                <Link className="btn btn-default" to={task['self'] + "/edit"}><i className="fa fa-edit"></i></Link>
                <button className="btn btn-danger" onClick={(e) => this.props.onTaskDelete(task['self'])}><i className="fa fa-trash"></i></button>
            </div>
        );
    }

    makeRow(task) {

        return {
            actions: this.getAvailableActions(task),
            name: task['name'],
            status: this.formatStatusColumn(task['status']),
            createdAt: this.formatDate(task['createdAt']),
            updatedAt: this.formatDate(task['updatedAt']),
            description: task['description']
        };
    }

    getColumns() {
        return [
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
    }

    getRows() {
        return this.state.tasks.map((task) => this.makeRow(task));
    }

    render() {
        return (
            <div>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    responsive
                    data={{columns: this.getColumns(), rows: this.getRows()}}
                />
            </div>
        );
    }
}
