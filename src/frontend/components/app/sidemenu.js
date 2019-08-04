import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideMenu extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            boards: []
        };
    }

    componentDidMount() {
        this.fetchBoards();
    }

    componentWillUpdate() {
        this.fetchBoards();
    }

    fetchBoards() {
        
        this.props.apiClient.getAllBoards()
            .then((result) => {
                this.setState({
                    boards: result.data
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <aside className="main-sidebar" id="sidebar-wrapper">
                <section className="sidebar">
                    <div className="container-fluid">
                        <ul className="sidebar-menu row">
                        {
                            this.state.boards.map(
                                (board) => <li className="col-sm-12"  key={board.uuid} title={board.description}>
                                    <Link className="pull-left" to={board.self}>{board.name}</Link>
                                </li>
                            )
                        }    
                        </ul>
                    </div>
                </section>
            </aside>
        );
    }
}