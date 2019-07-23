<?php

namespace App\Http\Controllers;

use Log;

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

    public function edit()
    {
        return view('tasks.edit');
    }
}