import React, { useState } from "react";
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
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState({
    unclaimed: [] as Task[],
    firstContact: [] as Task[],
    preparingWorkOffer: [] as Task[],
    sendToTherapist: [] as Task[],
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const addTaskToUnclaimed = (formData: Omit<Task, "id">) => {
    const task: Task = {
      ...formData,
      id: new Date().toISOString(),
    };

    setTasks((prev) => ({
      ...prev,
      unclaimed: [...prev.unclaimed, task],
    }));
  };

  const updateTask = (updatedTask: Task, newStatus: string) => {
    setTasks((prev) => {
      // Remove task from its current status
      const updatedTasks = { ...prev };
      Object.keys(prev).forEach((status) => {
        updatedTasks[status as keyof typeof tasks] = prev[status as keyof typeof tasks].filter(
          (task) => task.id !== updatedTask.id
        );
      });

      // Add task to the new status
      updatedTasks[newStatus as keyof typeof tasks].push(updatedTask);

      return updatedTasks;
    });

    setSelectedTask(null); // Close popup
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      Object.keys(prev).forEach((status) => {
        updatedTasks[status as keyof typeof tasks] = prev[status as keyof typeof tasks].filter(
          (task) => task.id !== taskId
        );
      });
      return updatedTasks;
    });

    setSelectedTask(null); // Close popup
  };

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
            tasks={tasks}
            onTaskClick={(task) => setSelectedTask(task)}
          />
        </div>
      </div>

      {selectedTask && (
        <TaskPopup
          task={selectedTask}
          statuses={Object.keys(tasks)}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default App;
