import React, { Component } from 'react';
import Display from '../utils/display';
import { Link } from 'react-router-dom';

function BoardUpdateInputs(props) {
    
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
                <label htmlFor="tasks[]"> Tarefas: </label> <br />
                <select id="boardTasks" name="tasks[]" value={props.tasks} onChange={(e) => props.onInputChange("tasks", $('#boardTasks').val())} className="form-control" multiple="multiple">
                    {props.availableTasks.map((task) => <option value={task.self} key={task.self}>{task.name}</option>)}
                </select>
            </div>
            <div className="form-group col-sm-12">
                <Link className="btn btn-default" to="/boards">Voltar</Link>
                <button className="btn btn-primary" onClick={props.onSubmit}>Salvar</button>
            </div>
        </div>
    );
}

export default class BoardsChanger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board: null,
            availableTasks: [],
            showMessage: false,
            success: false,
            message: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
        const { match: { params } } = this.props;

        Promise.all([
            this.props.apiClient.getBoard('/boards/' + params.boardUuid),
            this.props.apiClient.getBoardTasks('/boards/' + params.boardUuid),
            this.props.apiClient.getAllTasks()
        ])
        .then((results) => {

            let board = results[0].data;
            board['tasks'] = results[1].data.map((task) => task.self);

            this.setState({
                board: board,
                availableTasks: results[2].data
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    updateBoard(board) {

        this.props.apiClient.updateBoard(board)
        .then((result) => {
            
            this.setState({
                showMessage: true,
                success: true,
                message: "Quadro atualizado com com sucesso!"
            });

            setTimeout(() => {
                this.props.history.push('/boards');
            }, 1500);
        })
        .catch((err) => {
            
            this.setState({
                showMessage: true,
                success: false,
                message: "Ocorreu um erro ao tentar atualizar seu quadro. Tente novamente mais tarde"
            });
            
            console.error(err);
        });
    }

    handleInputChange(name, value) {
        
        let board = this.state.board;
        board[name] = value;

        this.setState({
            board: board
        });
    }

    handleSubmit() {

        if (!this.state.board.name) {
            
            this.setState({
                showMessage: true,
                success: false,
                message: "O campo nome é obrigatório"
            });
        } else {
            this.updateBoard(this.state.board);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.board ? 
                        <div>
                            <section className="content-header">
                                <h1 className="pull-left">Editando quadro: {this.state.board.name}</h1>
                            </section>
                            <div className="content">
                                <div className="clearfix"></div>
                                <Display showMessage={this.state.showMessage} success={this.state.success} message={this.state.message} />
                                <div className="clearfix"></div>
                                <div className="box box-primary">
                                    <div className="box-body">
                                        <BoardUpdateInputs
                                            name={this.state.board.name}
                                            description={this.state.board.description}
                                            tasks={this.state.board.tasks}
                                            onInputChange={this.handleInputChange}
                                            onSubmit={this.handleSubmit}
                                            availableTasks={this.state.availableTasks}
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