<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Tasks;
use App\Http\Resources\Tasks as TasksResource;
use App\Http\Requests\CreateTasksRequest;
use App\Http\Requests\UpdateTasksRequest;

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

    public function update($uuid, UpdateTasksRequest $request)
    {
        try {

            $task = Tasks::where('uuid', '=', $uuid)->first();

            if (empty($task)) {
                return response('Task not found', 404);    
            }

            $input = $request->all();

            $task['name'] = $input['name'] ?? $task['name'];
            $task['description'] = $input['description'] ?? $task['description'];
            $task['status'] = $input['status'] ?? $task['status'];

            $result = $task->save();

            if ($result) {
                return response()->json(new TasksResource($task));
            } else {
                return response("Could not update task", 500);
            }

        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }

    public function destroy($uuid)
    {
        try {

            $task = Tasks::where('uuid', '=', $uuid)->first();

            if (empty($task)) {
                return response('Task not found', 404);    
            }

            $task->delete();

            return response('', 204);

        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }
}