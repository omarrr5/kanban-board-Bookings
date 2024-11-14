import React, { useEffect, useState } from "react";
import api from "./API/ApiProvider"; 
import KanbanBoard from "./components/KanbanBoard";
import BookingForm from "./components/BookingForm";
import TaskPopup from "./components/TaskPopup";

interface Task {
  id: string;
  name: string;
  title: string;
  age: string;
  email: string;
  mobile: string;
  status: string; 
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState({
    unclaimed: [] as Task[],
    firstContact: [] as Task[],
    preparingWorkOffer: [] as Task[],
    sendToTherapist: [] as Task[],
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks initially or whenever needed
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/tasks");
      const data = response.data;

      const organizedTasks = {
        unclaimed: data.filter((task: Task) => task.status === "unclaimed"),
        firstContact: data.filter((task: Task) => task.status === "firstContact"),
        preparingWorkOffer: data.filter((task: Task) => task.status === "preparingWorkOffer"),
        sendToTherapist: data.filter((task: Task) => task.status === "sendToTherapist"),
      };

      setTasks(organizedTasks);
    } catch (err) {
      setError("Failed to load tasks.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Initial fetch when the component mounts
  }, []);

  // Handle adding tasks (moved here from BookingForm)
  const addTaskToUnclaimed = async (formData: Omit<Task, "id">) => {
    try {
      await api.post("/tasks", formData);
      fetchTasks(); // Re-fetch tasks after adding a new one
    } catch (err) {
      setError("Failed to add task.");
      console.error(err);
    }
  };

  // Handle updating tasks
  const updateTask = async (updatedTask: Task, newStatus: string) => {
    try {
      await api.put(`/tasks/${updatedTask.id}`, { ...updatedTask, status: newStatus });
      fetchTasks(); // Re-fetch tasks after updating a task
      setSelectedTask(null); // Close the task popup after update
    } catch (err) {
      setError("Failed to update task.");
      console.error(err);
    }
  };

  // Handle deleting tasks
  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`); // API call to delete the task
      fetchTasks(); // Re-fetch tasks after deletion
      setSelectedTask(null); // Close the task popup after deletion
    } catch (err) {
      setError("Failed to delete task.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{ backgroundColor: "#D3E5ED" }}
    >
      <h1 className="text-4xl font-bold text-center mb-8">Kanban Board</h1>
      <div className="w-full flex flex-col md:flex-row gap-6 items-start justify-center">
        <div className="max-w-xs">
          <BookingForm onSubmit={addTaskToUnclaimed} />
        </div>

        <div className="flex-grow">
          <KanbanBoard
            tasks={tasks} // Passing tasks down to KanbanBoard
            onTaskClick={(task) => setSelectedTask(task)} // Handling task click
          />
        </div>
      </div>

      {selectedTask && (
        <TaskPopup
          task={selectedTask}
          statuses={Object.keys(tasks)} // Pass task statuses here
          onUpdate={updateTask}
          onDelete={deleteTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
      <p>Developed by Omar Khalaf | Full Stack Developer</p>
    </div>
  );
};

export default App;
