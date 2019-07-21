<?php

namespace App\Models;

class Boards extends BaseModel
{
    protected $table = 'boards';
    protected $primaryKey = 'id';
    protected $requiresUuid = true;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    public function tasks()
    {
        return $this->belongsToMany(\App\Models\Tasks::class,  'board_tasks', 'boardId', 'taskId');
    }
}