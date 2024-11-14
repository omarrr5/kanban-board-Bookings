import React, { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import BookingForm from "./components/BookingForm";

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

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{ backgroundColor: "#D3E5ED" }}
    >
      <h1 className="text-4xl font-bold text-center mb-8">Kanban Board</h1>
      <div className="w-full flex flex-col md:flex-row gap-6 items-start justify-center">
        {/* Booking Form */}
        <div className="max-w-xs">
          <BookingForm onSubmit={addTaskToUnclaimed} />
        </div>

        {/* Kanban Board */}
        <div className="flex-grow">
          <KanbanBoard tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default App;
