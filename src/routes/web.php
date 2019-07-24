<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/tasks', 'TasksController@index')->name('tasks.index');
Route::get('/tasks/create', 'TasksController@create')->name('tasks.create');
Route::get('/tasks/{uuid}/edit', 'TasksController@edit')->name('tasks.edit');

Route::get('/boards', 'BoardsController@index')->name('boards.index');
Route::get('/boards/create', 'BoardsController@create')->name('boards.create');
Route::get('/boards/{uuid}/edit', 'BoardsController@edit')->name('boards.edit');