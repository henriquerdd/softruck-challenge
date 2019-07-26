import React, { Component } from 'react';
import TasksList from '../tasks/tasksList';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class BoardsList extends TasksList {

    constructor(props) {
        super(props);
        this.state = {
            availableBoards: [],
            boardTasks: [],
            board: null,
        };
    }

    componentDidMount() {
        
        this.props.apiClient.getAllBoards()
        .then((result) => {

            let boards = result.data;
            boards.unshift({self: '', name: ''});

            this.setState({
                availableBoards: boards
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    handleBoardSelectionChange(selectedBoard) {

        this.props.apiClient.getBoardTasks(selectedBoard)
        .then((result) => {
        
            this.setState({
                board: this.state.availableBoards.filter((board) => board.self == selectedBoard)[0],
                tasks: result.data,
                rows: this.makeRows(result.data)
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    deleteBoard(boardReference) {

        this.props.apiClient.deleteBoard(boardReference)
        .then((result) => {
            this.setState({
                availableBoards: this.state.availableBoards.filter((board) => board['self'] != boardReference),
                board: null,
                tasks: [],
                rows: []
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    render() {
        return (
            <div>
                <section className="content-header">
                    <h1 className="pull-left">Quadros</h1>
                    <h1 className="pull-right">
                        <Link className="btn btn-primary pull-right" style={{marginTop: -10, marginBottom: 5}} to="/boards/create">Novo</Link>
                    </h1>
                </section>
                <div className="content">
                    <div className="clearfix"></div>
                    <div className="box box-primary">
                        <div className="box-body">
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="board"> Quadros disponíveis: </label>
                                    <select name="board" onChange={(e) => this.handleBoardSelectionChange(e.currentTarget.value)} value={this.state.board ? this.state.board.self : ''} className="form-control">
                                        {this.state.availableBoards.map((board) => <option value={board.self} key={board.self}>{board.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            {
                                this.state.board ? (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h1 title={this.state.board.description}>
                                                <Link className="pull-left" to={this.state.board.self}>{this.state.board.name}</Link>
                                            </h1>
                                        </div>
                                        <div className="col-sm-12">
                                            <br />
                                            <MDBDataTable
                                                striped
                                                bordered
                                                hover
                                                responsive
                                                data={{columns: this.state.columns, rows: this.state.rows}}
                                            />
                                        </div>
                                        <div className="col-sm-12">
                                            <button className="btn btn-danger pull-right" onClick={(e) => this.deleteBoard(this.state.board['self'])}>Excluir Quadro</button>
                                        </div>
                                    </div>
                                ) : null
                            }            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}