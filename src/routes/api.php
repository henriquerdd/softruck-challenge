<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/tasks', 'TasksAPIController@all')->name('api.tasks.all');
Route::post('/tasks', 'TasksAPIController@store')->name('api.tasks.store');

Route::get('/tasks/{uuid}', 'TasksAPIController@find')->name('api.tasks.find');
Route::patch('/tasks/{uuid}', 'TasksAPIController@update')->name('api.tasks.update');
Route::delete('/tasks/{uuid}', 'TasksAPIController@destroy')->name('api.tasks.destroy');

Route::get('/boards', 'BoardsAPIController@all')->name('api.boards.all');
Route::post('/boards', 'BoardsAPIController@store')->name('api.boards.store');

Route::get('/boards/{uuid}', 'BoardsAPIController@find')->name('api.boards.find');
Route::patch('/boards/{uuid}', 'BoardsAPIController@update')->name('api.boards.update');
Route::delete('/boards/{uuid}', 'BoardsAPIController@destroy')->name('api.boards.destroy');

Route::get('/boards/{uuid}/tasks', 'BoardsAPIController@tasks')->name('api.boards.tasks');