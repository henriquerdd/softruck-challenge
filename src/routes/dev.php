<?php

Route::get('/logs', function () {
    return file_get_contents(storage_path('logs/laravel.log'));
});