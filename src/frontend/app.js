/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ApiClient from './apiClient'
import TasksList from './components/tasks/tasksList';
import TasksCreator from './components/tasks/tasksCreate';
import TasksChanger from './components/tasks/tasksUpdate';
import BoardsList from './components/boards/boardsList';
import BoardsCreator from './components/boards/boardsCreate';
import BoardsChanger from './components/boards/boardsUpdate';

const apiClient = new ApiClient();

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/tasks" render={(props) => <TasksList {...props} apiClient={apiClient} />} />
                <Route exact path="/tasks/create" render={(props) => <TasksCreator {...props} apiClient={apiClient} />} />
                <Route exact path="/tasks/:taskUuid" render={(props) => <TasksChanger {...props} apiClient={apiClient} />} />
                <Route exact path="/boards" render={(props) => <BoardsList {...props} apiClient={apiClient} />} />
                <Route exact path="/boards/create" render={(props) => <BoardsCreator {...props} apiClient={apiClient} /> } />
                <Route exact path="/boards/:boardUuid" render={(props) => <BoardsChanger {...props} apiClient={apiClient} /> } />
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));