<?php

use App\Http\Controllers\TaskController;
use App\Http\Middleware\SkipCorsMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([SkipCorsMiddleware::class])->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::get('/tasks/{id}', [TaskController::class, 'show']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
});
