<?php

namespace App\Models;

use Eloquent as Model;
use Webpatser\Uuid\Uuid;

abstract class BaseModel extends Model
{
    protected $requiresUuid = false;

    const UUID = 'uuid';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {

            if ($model->requiresUuid) {
                $model[static::UUID] = $model->generateUuid();
            }
        });
    }

    protected function generateUuid()
    {
        return (string) Uuid::generate(4);
    }
}