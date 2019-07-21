<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBoardsRequest extends FormRequest
{
    const TASK_PATTERN = '/\/tasks\/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i';

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'description' => 'nullable|string',
            'tasks' => 'sometimes|array',
            'tasks.*' => function ($attribute, $value, $fail) {

                if (!preg_match(self::TASK_PATTERN, $value)) {
                    $fail("Unknown task '$value'");
                }
            }
        ];
    }
}
