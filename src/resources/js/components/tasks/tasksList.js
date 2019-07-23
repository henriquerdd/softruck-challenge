import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';

const datatableColumns = [
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
            icon = 'fa fa-edit';
            text = " Pendente";
            //return "<span class='text-red'><i class='fa fa-edit'></i> Pendente</span>";
        break;
        case 'ACCEPTED':
            color = 'text-blue';
            icon = 'fa fa-edit';
            text = " Aceita";
            //return "<span class='text-orange'><i class='fa fa-edit'></i> Aceita</span>";
        break;
        case 'FINISHED':
            color = 'text-green';
            icon = 'fa fa-edit';
            text = " Terminada";
            //return "<span class='text-green'><i class='fa fa-edit'></i> Terminada</span>";
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
            columns: datatableColumns,
            rows: []
        };
    }

    componentDidMount() {

        this.props.apiClient.getAllTasks()
        .then((result) => {

            let data = result.data.map((row) => {

                return {
                    name: row['name'],
                    status: formatStatusColumn(row['status']),
                    createdAt: formatDate(row['createdAt']),
                    updatedAt: formatDate(row['updatedAt']),
                    description: row['description']
                };
            });

            this.setState({
                rows: data
            });
        })
        .catch((err) => {
            console.error(err);
        })
    }

    render() {
        return (
            <MDBDataTable
              striped
              bordered
              hover
              responsive
              data={{columns: this.state.columns, rows: this.state.rows}}
            />
        );
    }
}
