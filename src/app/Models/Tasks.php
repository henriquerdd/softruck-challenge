<?php

namespace App\Models;

class Tasks extends BaseModel
{
    protected $table = 'tasks';
    protected $primaryKey = 'id';
    protected $requiresUuid = true;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'name',
        'description',
        'createdAt',
        'updatedAt',
        'status'
    ];

    public function boards()
    {
        return $this->belongsToMany(\App\Models\Boards::class,  'board_tasks', 'taskId', 'boardId');
    }
}