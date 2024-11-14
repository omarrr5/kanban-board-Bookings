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
  status: TaskStatus;
}

export type TaskStatus = "unclaimed" | "firstContact" | "preparingWorkOffer" | "sendToTherapist";

interface InitialTasks {
  unclaimed: Task[];
  firstContact: Task[];
  preparingWorkOffer: Task[];
  sendToTherapist: Task[];
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<InitialTasks>({
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
      status: "unclaimed", // Set the initial status to "unclaimed"
    };

    setTasks((prev) => ({
      ...prev,
      unclaimed: [...prev.unclaimed, task],
    }));
  };

  const updateTask = (updatedTask: Task, newStatus: string) => {
    setTasks((prev) => {
      // Check if the task exists in the previous state before proceeding
      const existingTask = prev.unclaimed.find((task) => task.id === updatedTask.id);

      if (existingTask) {
        // Task exists, proceed with update logic
        if (newStatus === 'unclaimed') {
          const taskIndex = prev.unclaimed.findIndex((task) => task.id === updatedTask.id);
          if (taskIndex !== -1) {
            prev.unclaimed[taskIndex] = updatedTask;
            return prev;
          }
        } else {
          // Remove the task from its current status
          const updatedTasks = { ...prev };
          Object.keys(updatedTasks).forEach((status) => {
            updatedTasks[status as keyof typeof tasks] = prev[status as keyof typeof tasks].filter(
              (task) => task.id !== updatedTask.id
            );
          });

          // Add the task to the new status
          updatedTasks[newStatus as keyof typeof tasks].push(updatedTask);

          return updatedTasks;
        }
      } else {
        // Handle the case where the task doesn't exist
        console.warn("Task not found:", updatedTask.id);
        // You can optionally return the previous state to avoid unnecessary updates
        return prev;
      }
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

    setSelectedTask(null); 
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
      <p>Developed by Omar Khalaf | Full Stack Developer</p>
    </div>
  );
};

export default App;