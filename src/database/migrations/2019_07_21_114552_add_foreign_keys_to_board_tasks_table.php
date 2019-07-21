<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysToBoardTasksTable extends Migration
{
    const TABLE_NAME = 'board_tasks';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(self::TABLE_NAME, function (Blueprint $table) {
            $table->foreign('taskId')->references('id')->on('tasks')->onDelete('cascade');
            $table->foreign('boardId')->references('id')->on('boards')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(self::TABLE_NAME, function (Blueprint $table) {
            $table->dropForeign(self::TABLE_NAME . '_taskId_foreign');
            $table->dropForeign(self::TABLE_NAME . '_boardId_foreign');
        });
    }
}
