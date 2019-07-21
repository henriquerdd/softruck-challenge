<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Boards extends JsonResource
{
    const BASE_PATH = '/boards';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
            'self' => self::BASE_PATH . '/' . $this->uuid
        ];
    }
}
