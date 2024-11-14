import React, { useEffect, useState } from "react";
import api from "../API/ApiProvider";

interface Task {
  id: string;
  name: string;
  title: string;
  age: string;
  email: string;
  mobile: string;
  status: string; 
}

interface KanbanBoardProps {
  tasks: {
    unclaimed: Task[];
    firstContact: Task[];
    preparingWorkOffer: Task[];
    sendToTherapist: Task[];
  };
  onTaskClick: (task: Task) => void;
}


const KanbanBoard: React.FC<KanbanBoardProps> = ({ onTaskClick }) => {
  const [tasks, setTasks] = useState({
    unclaimed: [] as Task[],
    firstContact: [] as Task[],
    preparingWorkOffer: [] as Task[],
    sendToTherapist: [] as Task[],
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Format the status name
  const formatStatusName = (status: string) => {
    return status
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  useEffect(() => {
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

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Object.keys(tasks).map((status) => (
        <div key={status} className="bg-white p-4 rounded-lg shadow-md">
          {/* Status Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-l font-semibold">
              {formatStatusName(status)}
            </h2>
            <span className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full">
              {tasks[status as keyof typeof tasks].length}
            </span>
          </div>

          {/* Task List */}
          <ul className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {tasks[status as keyof typeof tasks].map((task) => (
              <li
                key={task.id}
                className="mt-2 p-4 border rounded cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center mb-2">
                  <p className="font-bold mr-4">{task.name}</p>
                  <p className="font-normal text-sm">{task.age} yo</p>
                </div>

                <p className="text-sm text-gray-700 mb-2">{task.mobile}</p>
                <p className="text-sm text-gray-700 mb-2 break-words">
                  {task.email}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
