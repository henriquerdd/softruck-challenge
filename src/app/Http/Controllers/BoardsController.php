<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Boards;
use App\Http\Resources\Boards as BoardsResource;

class BoardsController extends Controller
{
    public function index()
    {
        return view('boards.index');
    }

    public function create()
    {
        return view('boards.create');
    }

    public function edit($uuid)
    {
        $board = Boards::query()->where('uuid', '=', $uuid)->first();

        if (empty($board)) {
            flash('Quadro não encontrado')->error();
            return redirect()->route('boards.index');
        }

        return view('board.edit', [
            'board' =>  new TasksResource($board)
        ]);
    }
}