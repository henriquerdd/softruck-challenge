<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Tasks;
use App\Http\Resources\Tasks as TasksResource;

class TasksController extends Controller
{
    public function index()
    {
        return view('tasks.index');
    }

    public function create()
    {
        return view('tasks.create');
    }

    public function edit($uuid)
    {
        $task = Tasks::query()->where('uuid', '=', $uuid)->first();

        if (empty($task)) {
            flash('Tarefa não encontrada')->error();
            return redirect()->route('tasks.index');
        }

        return view('tasks.edit', [
            'task' =>  new TasksResource($task)
        ]);
    }
}