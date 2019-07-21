<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Tasks;
use App\Models\Boards;
use App\Http\Resources\Boards as BoardsResource;
use App\Http\Resources\Tasks as TasksResource;
use App\Http\Requests\CreateBoardsRequest;
use App\Http\Requests\UpdateBoardsRequest;

class BoardsAPIController extends Controller
{
    public function all()
    {
        return Boards::all()
            ->map(function ($board) {
                return new BoardsResource($board);
            });
    }

    public function store(CreateBoardsRequest $request)
    {
        try {

            $input = $request->all();
            $boardTasks = $this->getTaskIds($input['tasks']);

            if (count($boardTasks) != count($input['tasks'])) {
                return response("Of the given " . count($input['tasks']) . " only " . count($boardTasks) . " could be found", 400);
            }

            $model = new Boards([
                'name' => $input['name'],
                'description' => $input['description']
            ]);

            $result = $model->save();

            if (!$result) {
                return response("Could not create board", 500);
            }

            $model->tasks()->sync($boardTasks);
            
            return response()->json(new BoardsResource($model), 201);

        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }

    public function find($uuid)
    {
        try {
            
            $board = Boards::where('uuid', '=', $uuid)->first();

            if (empty($board)) {
                return response('Board not found', 404);    
            }

            return response()->json(new BoardsResource($board));
        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }

    public function update($uuid, UpdateBoardsRequest $request)
    {
        try {

            $board = Boards::where('uuid', '=', $uuid)->first();

            if (empty($board)) {
                return response('Board not found', 404);    
            }

            $input = $request->all();
            $boardTasks = $this->getTaskIds($input['tasks']);

            if (count($boardTasks) != count($input['tasks'])) {
                return response("Of the given " . count($input['tasks']) . " only " . count($boardTasks) . " could be found", 400);
            }

            $board['name'] = $input['name'] ?? $board['name'];
            $board['description'] = $input['description'] ?? $board['description'];
            $board['status'] = $input['status'] ?? $board['status'];

            $result = $board->save();

            if (!$result) {
                return response("Could not update board", 500);
            }

            $board->tasks()->sync($boardTasks);

            return response()->json(new BoardsResource($board));

        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }

    public function destroy($uuid)
    {
        try {

            $board = Boards::where('uuid', '=', $uuid)->first();

            if (empty($board)) {
                return response('Board not found', 404);    
            }

            $board->delete();

            return response('', 204);

        } catch (\Throwable $th) {
            Log::error(exception_msg($th));
            return response("Something went wrong! Try again later.", 500);
        }
    }

    public function tasks($uuid)
    {
        $board = Boards::where('uuid', '=', $uuid)
            ->with('tasks')
            ->first();

        if (empty($board)) {
            return response('Board not found', 404);    
        }

        $boardTasks = $board->tasks
            ->map(function ($task) {
                return new TasksResource($task)
            });

        return response()->json($boardTasks);
    }

    private function getTaskIds($taskReferences)
    {
        $taskUuids = collect($taskReferences)
            ->map(function ($reference) {

                $match = [];
                if (!preg_match('/\/tasks\/(.*)/', $reference, $match)) {
                    return null;
                }

                return $match[1];
            })
            ->filter()
            ->toArray();
        
        if (empty($taskReferences) ! count($taskUuids)) {
            return [];
        }

        return Tasks::whereIn('uuid', $taskUuids)
            ->select(['id'])
            ->get()
            ->toArray();
    }
}