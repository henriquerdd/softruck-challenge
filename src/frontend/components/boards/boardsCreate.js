import React, { Component } from 'react';
import Display from '../utils/display';
import { Link } from 'react-router-dom';

function BoardCreateInputs(props) {
    
    return (
        <div className="row">
            <div className="form-group col-sm-6">
                <label htmlFor="name"> Nome: </label>
                <input type="text" name="name" value={props.name} onChange={(e) => props.onInputChange("name", e.currentTarget.value)} className="form-control" />
            </div>
            <div className="form-group col-sm-12">
                <label htmlFor="description">Descrição</label>
                <textarea name="description" rows="3" value={props.description} onChange={(e) => props.onInputChange("description", e.currentTarget.value)} className="form-control"></textarea>
            </div>
            <div className="form-group col-sm-12">
                <Link className="btn btn-default" to="/">Voltar</Link>
                <button className="btn btn-primary" onClick={props.onSubmit}>Salvar</button>
            </div>
        </div>
    );
}

export default class BoardsCreator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            showMessage: false,
            success: false,
            message: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    creatBoard(name, description) {

        this.props.apiClient.createBoard({
            'name': name,
            'description': description
        })
            .then((result) => {
                
                this.setState({
                    name: "",
                    description: "",
                    showMessage: true,
                    success: true,
                    message: "Quadro criado com sucesso!"
                });

                setTimeout(() => {
                    this.setState({
                        showMessage: false
                    });
                }, 3000);
            })
            .catch((err) => {
                
                this.setState({
                    showMessage: true,
                    success: false,
                    message: "Ocorreu um erro ao tentar criar seu quadro. Tente novamente mais tarde"
                });

                setTimeout(() => {
                    this.setState({
                        showMessage: false
                    });
                }, 3000);
                
                console.error(err);
            });
    }

    handleInputChange(name, value) {
        
        let newState = {};
        newState[name] = value;
        this.setState(newState);
    }

    handleSubmit() {

        if (!this.state.name) {
            
            this.setState({
                showMessage: true,
                success: false,
                message: "O campo nome é obrigatório"
            });
        } else {
            this.creatBoard(this.state.name, this.state.description);
        }
    }

    render() {
        return (
            <div>
                <section className="content-header">
                    <h1 className="pull-left">Novo quadro</h1>
                </section>
                <div className="content">
                    <div className="clearfix"></div>
                    <Display showMessage={this.state.showMessage} success={this.state.success} message={this.state.message} />
                    <div className="clearfix"></div>
                    <div className="box box-primary">
                        <div className="box-body">
                            <BoardCreateInputs name={this.state.name} description={this.state.description} onInputChange={this.handleInputChange} onSubmit={this.handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
