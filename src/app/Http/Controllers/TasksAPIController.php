<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Tasks;
use App\Http\Resources\Tasks as TasksResource;
use App\Http\Requests\CreateTasksRequest;

class TasksAPIController extends Controller
{
    public function all()
    {
        return Tasks::all()
            ->map(function ($task) {
                return new TasksResource($task);
            });
    }

    public function store(CreateTasksRequest $request)
    {
        try {

            $input = $request->all();

            $model = new Tasks([
                'name' => $input['name'],
                'description' => $input['description'],
                'status' => 'PENDING'
            ]);

            $result = $model->save();

            if ($result) {
                return response()->json(new TasksResource($model), 201);
            } else {
                return response("Could not create task", 500);
            }

        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }

    public function find($uuid)
    {
        try {
            
            $task = Tasks::where('uuid', '=', $uuid)->first();

            if (empty($task)) {
                return response('Task not found', 404);    
            }

            return response()->json(new TasksResource($task));
        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }
}