/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

require('./components/tasks/tasksCreate');

import React from 'react';
import ReactDOM from 'react-dom';
import ApiClient from './apiClient';
import TasksList from './components/tasks/tasksList';
import TasksCreator from './components/tasks/tasksCreate';

const API_BASE_URL = 'http://localhost';

let apiClient = new ApiClient(API_BASE_URL, {'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')});

if (document.getElementById('tasks_list')) {
    ReactDOM.render(<TasksList apiClient={apiClient} />, document.getElementById('tasks_list'));
}

if (document.getElementById('tasks_create')) {
    ReactDOM.render(<TasksCreator apiClient={apiClient} />, document.getElementById('tasks_create'));
}
