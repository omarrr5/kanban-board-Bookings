<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Store a new task
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'age' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:255',
            'status' => 'required|in:unclaimed,firstContact,preparingWorkOffer,sendToTherapist',
        ]);

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    // Get all tasks
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    // Get a single task by ID
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    // Update an existing task
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'age' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:255',
            'status' => 'required|in:unclaimed,firstContact,preparingWorkOffer,sendToTherapist',
        ]);

        $task->update($request->all());

        return response()->json($task);
    }

    // Delete a task
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(null, 204);
    }
}

