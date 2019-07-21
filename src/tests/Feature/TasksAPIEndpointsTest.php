<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Webpatser\Uuid\Uuid;

class TasksAPIEndpointsTest extends TestCase
{
    use RefreshDatabase;

    const DEFAULT_SUCCESS_STATUS = 200;
    const SUCCESS_CREATE_STATUS = 201;
    const VALIDATION_FAILED_STATUS = 422;
    const NOT_FOUND_STATUS = 404;

    public function testCreateValidTask()
    {
        $taskData = [
            'name' => 'Test task 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/tasks', $taskData);
        
        $response
            ->assertStatus(self::SUCCESS_CREATE_STATUS)
            ->assertJsonStructure($this->getTaskStructure());
    }

    /**
     * Invalid tasks have no name
     */
    public function testCreateInvalidTask()
    {
        $taskData = [
            'description' => null
        ];

        $response = $this->json('POST', '/api/tasks', $taskData);

        $response->assertStatus(self::VALIDATION_FAILED_STATUS);
    }

    public function testRetrieveSingleExistingTask()
    {
        $taskData = [
            'name' => 'Test task 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/tasks', $taskData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $responseBody = json_decode($response->getContent(), true);

        $response = $this->json('GET', '/api' . $responseBody['self']);

        $response
            ->assertStatus(self::DEFAULT_SUCCESS_STATUS)
            ->assertJson($taskData)
            ->assertJsonStructure($this->getTaskStructure());
    }

    public function testRetrieveNonExistingTask()
    {
        $response = $this->json('GET', '/api/tasks/' . (string) Uuid::generate(4));

        $response->assertStatus(self::NOT_FOUND_STATUS);
    }

    public function testRetrieveMultipleTasks()
    {
        $taskData = [
            'name' => 'Test task 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/tasks', $taskData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $taskData = [
            'name' => 'Test task 2',
            'description' => 'Just checking if it works again'
        ];

        $response = $this->json('POST', '/api/tasks', $taskData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $response = $this->get('/api/tasks');

        $response
            ->assertStatus(self::DEFAULT_SUCCESS_STATUS)
            ->assertJsonStructure([
                '*' => $this->getTaskStructure()
            ]);
    }

    public function testUpdateTask()
    {
        $taskData = [
            'name' => 'Test task 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/tasks', $taskData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $responseBody = json_decode($response->getContent(), true);

        $updatedTaskData = [
            'status' => 'ACCEPTED'
        ];

        $response = $this->json('PATCH', '/api' . $responseBody['self'], $updatedTaskData);

        $response
            ->assertStatus(self::DEFAULT_SUCCESS_STATUS)
            ->assertJson($taskData + $updatedTaskData)
            ->assertJsonStructure($this->getTaskStructure());
    }

    private function getTaskStructure()
    {
        return [
            'name',
            'description',
            'createdAt',
            'updatedAt',
            'status',
            'self'
        ];
    }
}
