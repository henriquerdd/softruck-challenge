import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Header from './components/app/header';
import SideMenu from './components/app/sidemenu';
import ApiClient from './apiClient';
import Board from './components/boards/board';
import BoardsCreator from './components/boards/boardsCreate';
import BoardsChanger from './components/boards/boardsUpdate';
import TasksChanger from './components/tasks/tasksUpdate';

var apiClient = new ApiClient();

class App extends Component {
  
    render () {
        return (
            <div>
                <BrowserRouter>
                    <Header title="Quadros" />
                    <SideMenu apiClient={apiClient} />
                    <div class="content-wrapper">
                        <Switch>
                            <Route exact path="/boards/:boardUuid" render={(props) => <Board {...props} apiClient={apiClient} />} />
                            <Route exact path="/create/boards" render={(props) => <BoardsCreator {...props} apiClient={apiClient} /> } />
                            <Route exact path="/boards/:boardUuid/edit" render={(props) => <BoardsChanger {...props} apiClient={apiClient} /> } />
                            <Route exact path="/tasks/:taskUuid/edit" render={(props) => <TasksChanger {...props} apiClient={apiClient} />} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
