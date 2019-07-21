<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Webpatser\Uuid\Uuid;
use App\Models\Tasks;
use Illuminate\Support\Str;

class BoardsAPIEndpointsTest extends TestCase
{
    use RefreshDatabase;

    const DEFAULT_SUCCESS_STATUS = 200;
    const SUCCESS_CREATE_STATUS = 201;
    const SUCCESS_DELETE_STATUS = 204;
    const VALIDATION_FAILED_STATUS = 422;
    const NOT_FOUND_STATUS = 404;

    public function testCreateValidBoard()
    {
        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response
            ->assertStatus(self::SUCCESS_CREATE_STATUS)
            ->assertJsonStructure($this->getBoardStructure());
    }

    /**
     * Invalid boards have no name
     */
    public function testCreateInvalidBoard()
    {
        $boardData = [
            'description' => null
        ];

        $response = $this->json('POST', '/api/boards', $boardData);

        $response->assertStatus(self::VALIDATION_FAILED_STATUS);
    }

    public function testRetrieveSingleExistingBoard()
    {
        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $responseBody = json_decode($response->getContent(), true);

        $response = $this->json('GET', '/api' . $responseBody['self']);

        $response
            ->assertStatus(self::DEFAULT_SUCCESS_STATUS)
            ->assertJson($boardData)
            ->assertJsonStructure($this->getBoardStructure());
    }

    public function testRetrieveNonExistingBoard()
    {
        $response = $this->json('GET', '/api/boards/' . (string) Uuid::generate(4));

        $response->assertStatus(self::NOT_FOUND_STATUS);
    }

    public function testRetrieveMultipleBoards()
    {
        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $boardData = [
            'name' => 'Test board 2',
            'description' => 'Just checking if it works again'
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $response = $this->get('/api/boards');

        $response
            ->assertStatus(self::DEFAULT_SUCCESS_STATUS)
            ->assertJsonStructure([
                '*' => $this->getBoardStructure()
            ]);
    }

    public function testRetrieavalOfBoardTasks()
    {
        $tasks = $this->createTasks(3);

        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works',
            'tasks' => $tasks->pluck('self')->toArray()
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $board = json_decode($response->getContent(), true);

        $response = $this->get('/api' . $board['self'] . '/tasks');

        $response
            ->assertStatus(self::DEFAULT_SUCCESS_STATUS)
            ->assertJsonStructure(['*' => $this->getTaskStructure()]);

        $boardTasks = collect(
            json_decode($response->getContent(), true)
        )->pluck('self')->toArray();

        $this->assertEquals($tasks->pluck('self')->toArray(),  $boardTasks);
    }

    public function testUpdateBoard()
    {
        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $responseBody = json_decode($response->getContent(), true);

        $updatedBoardData = [
            'description' => 'Updated description'
        ];

        $response = $this->json('PATCH', '/api' . $responseBody['self'], $updatedBoardData);

        $response
            ->assertStatus(self::DEFAULT_SUCCESS_STATUS)
            ->assertJson($updatedBoardData + $boardData)
            ->assertJsonStructure($this->getBoardStructure());
    }

    public function testUpdateBoardWithInvalidData()
    {
        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $responseBody = json_decode($response->getContent(), true);

        $updatedBoardData = [
            'name' => null
        ];

        $response = $this->json('PATCH', '/api' . $responseBody['self'], $updatedBoardData);

        $response
            ->assertStatus(self::VALIDATION_FAILED_STATUS);   

        $updatedBoardData = [
            'tasks' => 'No way this is a valid task'
        ];

        $response = $this->json('PATCH', '/api' . $responseBody['self'], $updatedBoardData);

        $response
            ->assertStatus(self::VALIDATION_FAILED_STATUS);   
    }

    public function testUpdateBoardTasks()
    {
        $tasks = $this->createTasks(3);

        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works',
            'tasks' => $tasks->pluck('self')->toArray()
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $board = json_decode($response->getContent(), true);

        $tasks->pop();

        $response = $this->json('PATCH', '/api' . $board['self'], [
            'tasks' => $tasks->pluck('self')->toArray()
        ]);

        $response->assertStatus(self::DEFAULT_SUCCESS_STATUS);

        $response = $this->get('/api' . $board['self'] . '/tasks');

        $response->assertStatus(self::DEFAULT_SUCCESS_STATUS);

        $boardTasks = collect(
            json_decode($response->getContent(), true)
        )->pluck('self')->toArray();

        $this->assertEquals($tasks->pluck('self')->toArray(), $boardTasks);
    }

    public function testBoardDestruction()
    {
        $boardData = [
            'name' => 'Test board 1',
            'description' => 'Just checking if it works'
        ];

        $response = $this->json('POST', '/api/boards', $boardData);
        
        $response->assertStatus(self::SUCCESS_CREATE_STATUS);

        $responseBody = json_decode($response->getContent(), true);

        $response = $this->delete('/api' . $responseBody['self']);

        $response
            ->assertStatus(self::SUCCESS_DELETE_STATUS);
    }

    private function getBoardStructure()
    {
        return [
            'name',
            'description',
            'createdAt',
            'updatedAt',
            'self'
        ];
    }

    private function createTasks($numOfTasks=1)
    {
        $tasks = [];

        for($i = 0; $i < $numOfTasks; $i++) {
            
            $task = new Tasks([
                'name' => Str::random(10),
                'description' => "Automatically generated task"
            ]);

            $task->save();

            $tasks[] = $task;
        }

        return collect($tasks)->map(function ($task) {

            return [
                'name' => $task['name'],
                'description' => $task['description'],
                'createdAt' => $task['createdAt'],
                'updatedAt' => $task['updatedAt'],
                'status' => 'PENDING',
                'self' => '/tasks/' . $task['uuid']
            ];
        });
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
